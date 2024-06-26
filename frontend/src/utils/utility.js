export const getAnalyticsText = (criteria) => {
  let text;
  switch (criteria) {
    case "To do":
      text = "To-do Tasks";
      break;
    case "Backlog":
      text = "Backlog Tasks";
      break;
    case "Done":
      text = "Completed Tasks";
      break;
    case "In Progress":
      text = "In-Progress Tasks";
      break;
    case "high":
      text = "High Priority";
      break;
    case "low":
      text = "Low Priority";
      break;
    case "moderate":
      text = "Moderate Priority";
      break;
    case "due date":
      text = "Due Date Tasks";
      break;
  }
  return text;
};

export const formatedAnalyticsArr = (data) => {
  return Object.keys(data).map((criteria) => {
    let text = getAnalyticsText(criteria);
    return { [text]: data[criteria] };
  });
};
