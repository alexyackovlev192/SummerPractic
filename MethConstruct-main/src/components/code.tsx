// type TCompetency = {
//   code: number;
//   name: string;
//   achievementIndicators: TAchievementIndicator[];
// };

// type TAchievementIndicator = {
//   code: number;
//   wording: string;
//   knowledge: string;
//   skill: string;
//   mastery: string;
// };

// const competency: TCompetency = {
//   code: 5,
//   name: "Знание английского",
//   achievementIndicators: [
//     {
//       code: 12,
//       wording: "Че то",
//       knowledge: "Yes",
//       skill: "Hellovment",
//       mastery: "Father save us",
//     },
//     {
//       code: 12,
//       wording: "Че то",
//       knowledge: "Yes",
//       skill: "Hellovment",
//       mastery: "Father save us",
//     },
//   ],
// };

export {};

// import React from "react";
// import Typography from "@mui/material/Typography";
// import { TextField, Box } from "@mui/material";
// import { FormWrapper } from "./FormWrapper";
// import TreeView from "@mui/lab/TreeView";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import TreeItem from "@mui/lab/TreeItem";

// // interface RenderTree {
// //   id: string;
// //   name: string;
// //   children?: readonly RenderTree[];
// // }

// // const data: RenderTree = {
// //   id: "root",
// //   name: "Parent",
// //   children: [
// //     {
// //       id: "1",
// //       name: "Child - 1",
// //     },
// //     {
// //       id: "3",
// //       name: "Child - 3",
// //       children: [
// //         {
// //           id: "4",
// //           name: "Child - 4",
// //         },
// //       ],
// //     },
// //   ],
// // };

// type TCompetency = {
//   id: string;
//   code: string;
//   name: string;
//   achievementIndicators: TAchievementIndicator[];
// };

// type TAchievementIndicator = {
//   id: string;
//   code: string;
//   wording: string;
//   knowledge?: string;
//   skill?: string;
//   mastery?: string;
// };
// const competency: TCompetency = {
//   id: "1",
//   code: "5",
//   name: "Знание английского",
//   achievementIndicators: [
//     {
//       id: "1",
//       code: "12",
//       wording: "Че то",
//       knowledge: "Yes",
//       skill: "Hellovment",
//       mastery: "Father save us",
//     },
//     {
//       id: "1",
//       code: "12",
//       wording: "Че то",
//       knowledge: "Yes",
//       skill: "Hellovment",
//       mastery: "Father save us",
//     },
//   ],
// };

// type CompetencyData = {
//   competencies: TCompetency[];
// };

// type CompetencyFormProps = CompetencyData & {
//   updateFields: (fields: Partial<CompetencyData>) => void;
// };

// export function CompetencyForm({
//   competencies,
//   updateFields,
// }: CompetencyFormProps) {
//   const renderTree = (nodes: TCompetency) => (
//     <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
//       {Array.isArray(nodes.achievementIndicators)
//         ? nodes.achievementIndicators.map((node) => renderTree(node))
//         : null}
//     </TreeItem>
//   );
//   return (
//     <>
//       <FormWrapper title="Компетенции">
//         <Box display="flex" flexDirection="column" alignItems="center">
//           <TreeView
//             aria-label="rich object"
//             defaultCollapseIcon={<ExpandMoreIcon />}
//             defaultExpanded={["root"]}
//             defaultExpandIcon={<ChevronRightIcon />}
//             sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
//           >
//             {renderTree(competency)}
//           </TreeView>
//         </Box>
//       </FormWrapper>
//     </>
//   );
// }
