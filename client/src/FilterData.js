const FilterData = (data, search) =>{
    if(search === '')
    return data;
  return data.filter((item) => {
    const meetingName = item.MeetingName.toLowerCase();
    const meetingDate = item.MeetingDate.toLowerCase();
    const venue = item.Venue.toLowerCase();
    const time = item.Timings;
    const description = item.Description.toLowerCase();
    const username = item.username.toLowerCase();
    const status = item.status.toLowerCase();
    var x;
    if(meetingName.includes(search.toLowerCase()))
      x = meetingName.includes(search.toLowerCase())
    else if(meetingDate.includes(search.toLowerCase()))
      x = meetingDate.includes(search.toLowerCase())
    else if(venue.includes(search.toLowerCase()))
      x = venue.includes(search.toLowerCase())
    else if(time.includes(search))
      x = time.includes(search)
    else if(username.includes(search.toLowerCase()))
        x = username.includes(search.toLowerCase())
    else if(description.includes(search.toLowerCase()))
      x = description.includes(search.toLowerCase())
    else if(status.includes(search.toLowerCase()))
      x = status.includes(search.toLowerCase())
    return x
  })
}

export default FilterData;