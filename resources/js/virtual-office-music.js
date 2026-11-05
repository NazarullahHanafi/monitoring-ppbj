// Original instrumental patterns, synthesized locally. No external streams,
// tracking, uploads, or commercial recordings. Audio starts only on user gesture.
export const musicStyles = { pop: ['Pop', 108, 'triangle'], rock: ['Rock', 124, 'sawtooth'], jazz: ['Jazz café', 88, 'sine'], lofi: ['Lo-fi', 76, 'triangle'], acoustic: ['Acoustic', 96, 'triangle'], tropical: ['Tropical', 112, 'sine'] };
export function createOfficeMusic({ AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext, audio = new Audio(), timer = setTimeout, cancel = clearTimeout } = {}) {
    let context, master, handle, playing = false, step = 0, style = 'lofi', volume = .25, objectUrl = null;
    const voices = new Set();
    function note(frequency, start, duration, gain, type) {
        if (!context) return;
        const osc = context.createOscillator(), envelope = context.createGain(); osc.type = type; osc.frequency.setValueAtTime(frequency, start);
        envelope.gain.setValueAtTime(.0001, start); envelope.gain.exponentialRampToValueAtTime(gain, start + .012); envelope.gain.exponentialRampToValueAtTime(.0001, start + duration);
        osc.connect(envelope); envelope.connect(master); voices.add(osc);
        osc.onended = () => { voices.delete(osc); osc.disconnect(); envelope.disconnect(); }; osc.start(start); osc.stop(start + duration + .02);
    }
    function beat() {
        if (!playing || objectUrl || !context) return;
        const [, bpm, type] = musicStyles[style], interval = 60 / bpm / 2, at = context.currentTime + .025;
        const chord = [[48, 52, 55, 59], [45, 48, 52, 55], [41, 45, 48, 52], [43, 47, 50, 53]][Math.floor(step / 8) % 4];
        const hz = n => 440 * 2 ** ((n - 69) / 12);
        if (step % 8 === 0) chord.forEach((n, i) => note(hz(n + 12), at + i * .018, interval * 7, .025, type));
        if (step % 2 === 0) note(hz(chord[0] - 12), at, interval * 1.8, .1, 'sine');
        if (style === 'rock' || style === 'pop' || style === 'tropical') {
            if (step % 4 === 0) note(55, at, .13, .19, 'sine');
            if (step % 4 === 2) note(180, at, .06, .035, 'triangle');
        }
        const pattern = style === 'jazz' ? [0, 2, 1, 3, 2, 1, 3, 2] : [0, 1, 2, 1, 3, 2, 1, 2];
        note(hz(chord[pattern[step % 8]] + (style === 'tropical' ? 24 : 12)), at, interval * .8, .038, 'sine');
        step++; handle = timer(beat, interval * 1000);
    }
    function stop() {
        playing = false; if (handle) cancel(handle); handle = null; audio.pause();
        for (const osc of voices) { try { osc.stop(); } catch {} } voices.clear();
        context?.suspend();
    }
    return {
        async play() {
            if (playing) return;
            playing = true;
            try {
                if (objectUrl) { audio.volume = volume; await audio.play(); return; }
                if (!AudioContext) throw new Error('Audio tidak didukung. Pilih berkas musik sendiri.');
                context ||= new AudioContext(); if (!master) { master = context.createGain(); master.connect(context.destination); }
                master.gain.value = volume; await context.resume(); if (playing) beat();
            } catch(error) { playing = false; throw error; }
        }, stop,
        style(value) { if (!Object.hasOwn(musicStyles, value)) return; const was = playing; stop(); if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = null; audio.removeAttribute('src'); style = value; step = 0; if (was) return this.play(); },
        volume(value) { volume = Math.max(0, Math.min(1, Number(value) || 0)); audio.volume = volume; if (master && context) master.gain.setTargetAtTime(volume, context.currentTime, .03); },
        local(file) { if (!file || file.size > 60 * 1024 * 1024 || !file.type.startsWith('audio/')) throw new Error('Pilih berkas audio hingga 60 MB.'); stop(); if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = URL.createObjectURL(file); audio.src = objectUrl; audio.loop = true; },
        dispose() { stop(); if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = null; audio.removeAttribute('src'); context?.close(); },
        playing: () => playing
    };
}
