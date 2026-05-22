import dbConnect from "@/lib/dbConnect";
import { Category } from "@/models/Category";
import { Command } from "@/models/Command";
import {
  getCachedCategories,
  setCachedCategories,
  getCachedCommands,
  setCachedCommands,
} from "@/lib/dataCache";
import { ICategory, ICommand } from "@/types";
import CheatsheetClient from "@/components/CheatsheetClient";
import { encodeResponse } from "@/lib/security";

export const dynamic = "force-dynamic";

async function getInitialData() {
  await dbConnect();

  let categories = getCachedCategories();
  if (!categories) {
    const dbCategories = (await Category.find({})
      .sort({ parentId: 1, order: 1 })
      .lean()) as unknown as ICategory[];
    categories = dbCategories.map((cat) => ({
      ...cat,
      _id: cat._id.toString(),
    }));
    setCachedCategories(categories);
  }

  let commands = getCachedCommands();
  if (!commands) {
    const dbCommands = (await Command.find({})
      .sort({ createdAt: 1 })
      .lean()) as unknown as ICommand[];
    commands = dbCommands.map((cmd) => ({
      ...cmd,
      _id: cmd._id.toString(),
    }));
    setCachedCommands(commands);
  }

  return { categories, commands };
}

export default async function Home() {
  const { categories, commands } = await getInitialData();
  const securePayload = encodeResponse({ categories, commands });

  return <CheatsheetClient securePayload={securePayload} />;
}
