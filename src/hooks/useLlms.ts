// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import {
//   useGetAllAPIModels,
//   usePostAPIModel,
//   usePutAPIModel,
//   useDeleteAPIModel,
// } from "../services/apiService";
// import { llmsAtom } from "../state/models";
// import { Model } from "../types";

// export const useLlms = () => {
//   const [llms, setLlms] = useRecoilState(llmsAtom);
//   const fetchAllModels = useGetAllAPIModels<Model>();
//   const createModel = usePostAPIModel<Model>();
//   const updateModel = usePutAPIModel<Model>();
//   const deleteModel = useDeleteAPIModel();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (llms === null) {
//         try {
//           const data = await fetchAllModels("models");
//           setLlms(data);
//         } catch (error) {
//           console.error("Failed to fetch LLM models:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [fetchAllModels, llms, setLlms]);

//   const addLlm = async (newLlm: Model) => {
//     try {
//       const createdLlm = await createModel("models", newLlm);
//       setLlms((prev) => (prev ? [...prev, createdLlm] : [createdLlm]));
//     } catch (error) {
//       console.error("Failed to create LLM model:", error);
//     }
//   };

//   const updateLlm = async (updatedLlm: Model) => {
//     try {
//       const updated = await updateModel("models", updatedLlm);
//       setLlms((prev) =>
//         prev?.map((llm) => (llm.id === updated.id ? updated : llm))
//       );
//     } catch (error) {
//       console.error("Failed to update LLM model:", error);
//     }
//   };

//   const deleteLlm = async (id: number) => {
//     try {
//       await deleteModel("models", id);
//       setLlms((prev) => prev?.filter((llm) => llm.id !== id));
//     } catch (error) {
//       console.error("Failed to delete LLM model:", error);
//     }
//   };

//   const reorderLlms = async (sourceIndex: number, destinationIndex: number) => {
//     if (llms == null) return;

//     const newOrder = Array.from(llms);
//     const [movedItem] = newOrder.splice(sourceIndex, 1);
//     newOrder.splice(destinationIndex, 0, movedItem);

//     setLlms(newOrder); // Optimistic update

//     const updates = newOrder.reduce((acc, model, index) => {
//       if (model.display_order !== index) {
//         acc.push({ ...model, display_order: index });
//       }
//       return acc;
//     }, [] as Model[]);

//     try {
//       await Promise.all(updates.map((model) => updateModel("models", model)));
//     } catch (error) {
//       console.error("Failed to reorder LLM models:", error);
//       // Optionally, rollback optimistic update
//     }
//   };

//   return { llms, addLlm, updateLlm, deleteLlm, reorderLlms };
// };
