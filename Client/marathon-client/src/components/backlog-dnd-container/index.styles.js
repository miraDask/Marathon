import tw from 'tailwind.macro';

export const FlexWrapper = tw.div`
inline-flex
`;

export const ChildrenContainer = tw.div`
h-full px-2 py-2 border-dashed border-2 border-gray-400 overflow-hidden text-center relative
`;

export const UpperActionsContainer = tw.div`
flex justify-between text-lg
`;

export const UnderActionsContainer = tw.div`
flex justify-between mt-2
`;
