// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment} from "react";
// import React, { useState } from "react";
// import axios from "axios";

// export default function DCDeleteModal({show,closeModal,daycareName}) {
//   const [error, setErrorMessage] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
  
//   const deleteRequestHandler = async (daycareName) => {
//      await axios.delete(
//         `https://tvda8762ih.execute-api.ap-northeast-1.amazonaws.com/prod/daycare/delete?name=${daycareName}`
//       )
//       .then(() => setStatusMessage("success"))
//       .catch((error) => {
//         setErrorMessage(error.message);
//         console.error("There was an error!", error);
//       });
//   };
//   return (
//     <Transition appear show={show} as={Fragment}>
//        <Dialog
//           as="div"
//           onClose={closeModal}
//           className="fixed inset-0 z-10 overflow-y-auto"
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900"
//                 >
//                   Are you sure?
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500 border-t pt-2">
//                    You are about to delete a daycare. Be mindful that this action cannot be reverse.
//                   </p>
//                 </div>

//                 <div className="mt-4 block">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 mr-4"
//                     onClick={(e) => deleteRequestHandler(daycareName)
//                       .then((e=> closeModal))
//                     }
//                   >
//                     Delete
//                   </button>
//                   <button
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 text-sm border-2  rounded-md  duration-300"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </div> 
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//         </Transition>
//   );
// }
