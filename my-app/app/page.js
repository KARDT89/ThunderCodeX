import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import Navbar from "./components/Navbar/Navbar";
import ProblemsTable from "./components/ProblemsTable/ProblemsTable";


export default function Home() {

  return (
    <>
      <main className="bg-zinc-900 min-h-screen text-white">
        <Navbar />
        <div className="relative overflow-x-auto mx-auto max-w-6xl px-6 pb-12 pt-20">
          <Table className="min-w-full bg-zinc-800 rounded-lg shadow-md">
            <TableHeader className="text-xs text-gray-300 uppercase">
              <TableRow className="border-b border-gray-700">
                <TableCell className="p-4">Status</TableCell>
                <TableCell className="p-4">Title</TableCell>
                <TableCell className="p-4">Difficulty</TableCell>
                <TableCell className="p-4">Category</TableCell>
                <TableCell className="p-4">Solution</TableCell>
              </TableRow>
            </TableHeader>

            <ProblemsTable />
          </Table>
        </div>
      </main>
    </>
  );
}
