function getFarewellText(language) {
    const options = [
        `So long, ${language}! The world won't be the same without you.`,
        `Goodbye, ${language}! Your legacy will live on forever.`,
        `The curtains have closed for ${language}. Bravo on a remarkable run!`,
        `Oh no, ${language}, you’ve met your end. Gone too soon!`,
        `Farewell, ${language}. The programming cosmos mourns your loss.`,
        `${language}, the sun has set on your era. We'll always remember you.`,
        `It's a bittersweet goodbye to ${language}. You've been extraordinary!`,
        `${language} has fallen, but its echoes will reverberate through time.`,
        `Good night, sweet ${language}. May flights of angels sing you to your rest.`,
        `${language} has logged off for good. What a journey it has been!`,
        `The saga of ${language} ends here, leaving a trail of unforgettable memories.`,
        `${language}, the final chapter has been written. Fare thee well.`,
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

export default getFarewellText;
