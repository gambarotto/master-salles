class HandleFileName {
  static extractExtension(filename: string): string {
    const extensao = filename.substring(filename.lastIndexOf('.') + 1);
    return extensao;
  }

  static extractName(filename: string): string {
    const name = filename.substring(filename.lastIndexOf('-') + 1);
    const spl = this.extractExtension(name);
    return name.substr(0, name.length - spl.length - 1);
  }
}
export default HandleFileName;
