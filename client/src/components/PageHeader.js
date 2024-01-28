import React from "react";


// Using mui this function will take in a title and return a header of that title

// export function PageHeader() {
//     return
//     <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3 bg-white">
//         <h1 className="text-2xl font-bold text-gray-900">Home</h1>
//     </div>;
// }
// Error:
//export 'PageHeader' (imported as 'PageHeader') was not found in '../components/PageHeader' (possible exports: default)
// Padding left and right are 16px
// flex direction is row
// align items is center
// align items for text is stretch
// heigh is 28px
// position is relative
function PageHeader({title}) {
    return (<div className="flex justify-between items-center border-b border-gray-200 px-4 py-3 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </div>);
}

export default PageHeader;