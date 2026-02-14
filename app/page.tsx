import { getCDSLData } from "./lib/cdsl";
import RunScraperButton from "./components/RunScraperButton";
import FIITable from "./components/FIITable";

export default async function Home() {
  const data = await getCDSLData();
  console.log(data);
  return (
    <div className="p-10">
      <RunScraperButton />
      <h1 className="text-3xl font-bold mb-4">FII Sectoral Flow</h1>

      <p className="mb-6 text-gray-500">
        Latest Statement: {data.latestStatement}
      </p>

      <FIITable sectors={data.sectors} latestStatement={data.latestStatement} />
    </div>
  );
}
