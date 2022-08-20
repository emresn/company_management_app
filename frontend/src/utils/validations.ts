export function isRequired(data: string | number) {
  return data !== undefined && data !== "" ? true : false;
}

export function isValidHttpUrl(data: string) {
  let url;
  try {
    url = new URL(data);
    console.log(url)
    
  } catch (_) {
    return false;
  }
  return true;
}


export function isValidNumber(data:string){
  if (data.match(/^\d+/)) {
    return true
  }else {
    return false
  }
}