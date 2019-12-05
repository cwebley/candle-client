export function currentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function currentDateTime() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const MM = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const yyyy = today.getFullYear();
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");
  const ss = String(today.getSeconds()).padStart(2, "0");

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}

export function formatMoment(m) {
  return m.format("yyyy-MM-ddThh:mm:ss");
}

export function calculateFragranceLoad({
  fragranceWeightOunces = 0,
  waxWeightOunces = 0,
  additiveWeightOunces = 0
}) {
  return (
    (fragranceWeightOunces /
      (waxWeightOunces + fragranceWeightOunces + additiveWeightOunces)) *
    100
  ).toFixed(2);
}

export default function handleApiError(err, enqueueSnackFunction) {
  const data = err.response && err.response.data;
  if (data && data.reasons) {
    data.reasons.forEach(r =>
      enqueueSnackFunction(r.message, { variant: "error" })
    );
    return;
  }
  if (data && data.message) {
    enqueueSnackFunction(data.message, { variant: "error" });
    return;
  }
  enqueueSnackFunction("Failed to communicate with server", {
    variant: "error"
  });
}
