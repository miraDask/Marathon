import tw from 'tailwind.macro';

export const AlertContainer = tw.div`
px-6 py-4 rounded relative mb-4 border border-teal-500 text-teal-500 bg-teal-100
`;

export const MessageContainer = tw.span`
inline-block align-middle mr-8
`;

export const Message = tw.b`
capitalize
`;

export const Button = tw.button`
absolute bg-transparent text-2xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none
`;
