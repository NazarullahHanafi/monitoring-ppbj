export const weatherLabels = { clear: 'Cerah', rain: 'Hujan', snow: 'Salju', aurora: 'Aurora', mist: 'Kabut' };
export function weatherFor(settings = {}, milliseconds = Date.now()) {
    const sequence = Object.keys(weatherLabels), hours = [2, 3, 4, 6].includes(Number(settings.cycle_hours)) ? Number(settings.cycle_hours) : 3;
    const span = hours * 3600000, slot = Math.floor(milliseconds / span);
    return { mode: Object.hasOwn(weatherLabels, settings.weather) ? settings.weather : sequence[(slot % sequence.length + sequence.length) % sequence.length], next: (slot + 1) * span, hours };
}
