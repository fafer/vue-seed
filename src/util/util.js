export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function loadingData({ start, time = 300, loading, end }) {
  let timer = null;
  if (start) timer = setTimeout(start, time);
  try {
    await loading();
  } finally {
    timer && (clearTimeout(timer), (timer = null));
    end && end();
  }
}
