export const generateMockPosts = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: `${index + 1}`,
        order: `${index + 1}`,
        title: `${generateGibberish(2, 5)}`,
        description: `${generateGibberish(5, 10)}`
    }));
};

function generateGibberish(min, max) {
    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
        'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
    ];
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
}