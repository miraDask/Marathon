import React from 'react';

const SidebarNavItem = ({ type, children }) => {
	const otherClasses = {
		active: {
			a: 'text-orange-500 border-orange-500',
			i: 'text-orange-500',
			span: 'text-sm md:text-orange-500 text-orange-500 md:font-bold'
		},
		inactive: {
			a: 'border-gray-400 md:border-gray-400',
			i: '',
			span: 'hover:text-orange-500 text-xs md:text-base text-gray-600 md:text-gray-400'
		}
	};
	return (
		<li class="mr-3 flex-1 text-center">
			<a
				href="/"
				class={`block py-1 md:py-3 pl-1 align-middle no-underline
                                  border-b-2 ${otherClasses[type].a}`}
			>
				<i class={`fas fa-link pr-0 md:pr-3 ${otherClasses[type].i}`} />
				<span class={`pb-1 md:pb-0 block md:inline-block ${otherClasses[type].span}`}>{children}</span>
			</a>
		</li>
	);
};

export default SidebarNavItem;
