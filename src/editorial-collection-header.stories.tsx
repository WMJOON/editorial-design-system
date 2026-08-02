import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionHeader } from "./editorial-collection-header.js";

const meta = { title: "Molecules/Editorial Collection/Collection header", component: EditorialCollectionHeader, args: { heading: "Latest", countLabel: "3 notes", view: "list" }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialCollectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => { const [view, setView] = useState(args.view); return <EditorialCollectionHeader {...args} view={view} onViewChange={setView} />; } };
