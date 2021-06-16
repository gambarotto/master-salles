const compareNamesEquals = (name1: string, name2: string): boolean => {
  const clearName = name1.trim().toLowerCase();
  const clearNameRequest = name2.trim().toLowerCase();
  return clearName === clearNameRequest;
};

export default compareNamesEquals;
