import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

// function SearchBar() {
//     return (<div className="flex flex-row items-center relative flex-grow justify-end px-3 py-3 h-16">
//
//
//             <div className="relative w-80">
//         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//           <MagnifyingGlassIcon className="h-5 w-5 text-gray-500"/>
//         </span>
//                 <input
//                     className="block w-full pl-10 pr-3 py-2 rounded-full bg-white focus:outline-none focus:bg-white focus:ring-0 border border-gray-300 z-10"
//                     type="text"
//                     placeholder="Search NewsFlash"
//                 />
//                 <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none z-20"></div>
//             </div>
//         </div>);
// }


// function SearchBar() {
//     return (
//         <div className="flex flex-row items-center relative justify-end px-3 py-3 h-16">
//             <div className="relative w-80">
//         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//           <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
//         </span>
//                 <input
//                     className="block w-full pl-10 pr-3 py-2 rounded-full bg-white focus:outline-none focus:bg-white focus:ring-0 border border-gray-300 z-10"
//                     type="text"
//                     placeholder="Search NewsFlash"
//                 />
//                 <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none z-20"></div>
//             </div>
//         </div>
//     );
// }

function SearchBar() {
    return (
        <div className="flex flex-row items-center justify-end px-3 py-3 md:h-16">
            <div className="relative w-full md:w-80">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500"/>
        </span>
                <input
                    className="block w-full pl-10 pr-3 py-2 rounded-full bg-white focus:outline-none focus:bg-white focus:ring-0 border border-gray-300 z-10"
                    type="text"
                    placeholder="Search NewsFlash"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none z-20"></div>
            </div>
        </div>
    );
}

export default SearchBar;

