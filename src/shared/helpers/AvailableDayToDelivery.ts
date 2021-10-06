/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { addDays, isAfter, isBefore } from 'date-fns';

interface ApiHolidayResponse {
  date: string | Date;
  name: string;
  link: string;
  type: string;
  description: string;
  type_code: string;
  raw_description?: string;
}
interface GetHoliday {
  year: number;
  city: string;
  yearEnd: boolean;
}
interface IVerifyAvailableDays {
  initialDate: Date;
  city: string;
}
export interface IAvailableDaysResponse {
  date: Date;
  available: boolean;
  reason: string;
}
class AvailableDayToDelivery {
  private baseUrl;

  private year;

  private token;

  constructor() {
    this.baseUrl = 'https://api.calendario.com.br/?json=true&';
    this.year = new Date().getFullYear();
    this.token = process.env.API_HOLIDAY_TOKEN;
  }

  private async getHolidays({
    year,
    city,
    yearEnd,
  }: GetHoliday): Promise<ApiHolidayResponse[]> {
    try {
      let holidays = [];
      const response = await axios.get<ApiHolidayResponse[]>(
        `${this.baseUrl}ano=${year}&estado=sp&cidade=${city}&token=${this.token}`,
      );
      holidays = [...response.data];
      if (yearEnd) {
        const responseTwoYears = await axios.get<ApiHolidayResponse[]>(
          `${this.baseUrl}ano=${year + 1}&estado=sp&cidade=${city}&token=${
            this.token
          }
          }`,
        );
        holidays.push(responseTwoYears.data[0]);
      }
      return holidays;
    } catch (error) {
      throw new AppError('Error while fetching data');
    }
  }

  public async verifyAvailableDays({
    city,
    initialDate,
  }: IVerifyAvailableDays): Promise<IAvailableDaysResponse[]> {
    const initialYear = initialDate.getFullYear();
    const daysAdded = 14;
    const finalDate = addDays(initialDate, daysAdded);

    const holidays = await this.getHolidays({
      year: this.year,
      city,
      yearEnd: initialYear !== finalDate.getFullYear(),
    });
    const typesOfHolidaysNotAcepts = ['Dia Convencional', 'Facultativo'];

    const availableDays: IAvailableDaysResponse[] = [];

    // Verifica os 14 próximos dias
    for (let i = 0; i < daysAdded; i++) {
      // Add um dia a cada volta do loop
      const date = addDays(initialDate, i);
      // Verifica se for no mesmo dia se já passou das 08
      const today = date.getHours();
      if (date === initialDate && today >= 8) {
        availableDays.push({
          date,
          available: false,
          reason: 'after 08:00',
        });
      } else {
        let isAvailable = true;
        // Recupera apenas os feriados que estão dentro do período definido
        const periodHolidays = holidays.filter(holiday => {
          const dateHolidayParams = String(holiday.date)
            .split('/')
            .reverse()
            .join('/');
          const dateHoliday = new Date(dateHolidayParams);
          if (
            isAfter(dateHoliday, initialDate) &&
            isBefore(dateHoliday, finalDate)
          ) {
            Object.assign(holiday, { date: dateHoliday });
            return holiday;
          }
        });
        // Retorna apenas o feriado válido, e define isAvailable como false
        periodHolidays.forEach(holiday => {
          if (
            new Date(holiday.date).getDate() === date.getDate() &&
            !typesOfHolidaysNotAcepts.includes(holiday.type)
          ) {
            isAvailable = false;
            availableDays.push({
              date: holiday.date as Date,
              available: false,
              reason: holiday.name,
            });
          }
        });
        // Se não tem feriado válido, é verificado se é sábado ou domingo
        if (isAvailable) {
          const weekDay = date.getDay();
          if (weekDay === 0 || weekDay === 6) {
            availableDays.push({
              date,
              available: false,
              reason: weekDay === 0 ? 'Domingo' : 'Sábado',
            });
          } else {
            availableDays.push({
              date,
              available: true,
              reason: 'available',
            });
          }
        }
      }
    }
    return availableDays;
  }
}
export default AvailableDayToDelivery;
