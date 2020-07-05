import React from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
const HomePage = () => (
	<MainWrapper>
		<div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
			<div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
				<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
					Before they sold out
					<br class="hidden lg:inline-block" />readymade gluten
				</h1>
				<p class="mb-8 leading-relaxed">
					Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke
					beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut
					hexagon try-hard chambray.
				</p>
				<div class="flex justify-center">
					<button class="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">
						Button
					</button>
					<button class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
						Button
					</button>
				</div>
			</div>
			<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
			</div>
		</div>

		<div class="container px-5 py-24 mx-auto flex flex-wrap">
			<div id="about" class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
				<img
					alt="feature"
					class="object-cover object-center h-full w-full"
					src="https://dummyimage.com/460x500"
				/>
			</div>
			<div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
				<div class="flex flex-col mb-10 lg:items-start items-center">
					<div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-6 h-6"
							viewBox="0 0 24 24"
						>
							<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
						</svg>
					</div>
					<div class="flex-grow">
						<h2 class="text-gray-900 text-lg title-font font-medium mb-3">Shooting Stars</h2>
						<p class="leading-relaxed text-base">
							Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo
							juice poutine.
						</p>
						<a class="mt-3 text-teal-500 inline-flex items-center">
							Learn More
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								class="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
				<div class="flex flex-col mb-10 lg:items-start items-center">
					<div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-6 h-6"
							viewBox="0 0 24 24"
						>
							<circle cx="6" cy="6" r="3" />
							<circle cx="6" cy="18" r="3" />
							<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
						</svg>
					</div>
					<div class="flex-grow">
						<h2 class="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2>
						<p class="leading-relaxed text-base">
							Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo
							juice poutine.
						</p>
						<a class="mt-3 text-teal-500 inline-flex items-center">
							Learn More
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								class="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
				<div class="flex flex-col mb-10 lg:items-start items-center">
					<div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-6 h-6"
							viewBox="0 0 24 24"
						>
							<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					</div>
					<div class="flex-grow">
						<h2 class="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2>
						<p class="leading-relaxed text-base">
							Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo
							juice poutine.
						</p>
						<a class="mt-3 text-teal-500 inline-flex items-center">
							Learn More
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								class="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</MainWrapper>
);

export default HomePage;
