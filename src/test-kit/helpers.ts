export function getArrayRandomItem<T>(arr: T[]) {
    return;
}

export function getRandomIndex(maxIndex: number) {
    if (maxIndex > -1) {
        return Math.floor(Math.random() * maxIndex);
    }
    console.log(`Wrong value range for random index ${maxIndex}`);
    return maxIndex;
}

export function generateRandomSentence(): string {
    const word1 = [
        'Complete',
        'Prepare',
        'Garden',
        'Study',
        'Handle',
        'Exercise',
        'Stay',
        'Plan',
        'Daily',
        'Home',
        'Chores',
        'Write',
        'Outdoor',
        'Letters',
    ];

    const word2 = [
        'daily',
        'evening',
        'and',
        'read',
        'errands',
        'productive',
        'study',
        'routine',
        'tasks',
        'hiking',
        'for',
    ];

    const word3 = [
        'chores',
        'meal',
        'write',
        'housework',
        'online',
        'travel',
        'relax',
        'hobbies',
        'exercise',
        'call',
        'today',
        'books',
    ];

    const randomWord1 = word1[Math.floor(Math.random() * word1.length)];
    const randomWord2 = word2[Math.floor(Math.random() * word2.length)];
    const randomWord3 = word3[Math.floor(Math.random() * word3.length)];

    const sentence = `${randomWord1} ${randomWord2} ${randomWord3}.`;

    return sentence;
}
