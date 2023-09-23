const timeToHoursAndMinutes = (mins) => {
    
    // if (time < 60) {
    //   return time + " minutes";
    // }
      
    //   let hours = time / 60;
    //   let rhours = Math.floor(hours);
    //   let minutes = (hours - rhours) * 60;
    //   let rminutes = Math.round(minutes);

    //   if (rminutes) {
    //     return rhours + " hours and " + rminutes + " minutes";
    //   } else {
    //     return hours + " hours";
    //   }
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;

    if (hours < 1) {
        hours = "";
    } else if (hours == 1) {
        hours += " hour ";
    } else {
        hours += " hours ";
    }

    if (minutes < 1) {
        minutes = "";
    } else if (minutes == 1) {
        minutes = minutes + " minute";
    } else {
        minutes = minutes + " minutes";
    }

    let time = hours + minutes;

    return time;
  
}

export {
    timeToHoursAndMinutes,
}