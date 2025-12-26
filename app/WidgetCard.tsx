"use client";

import { useEffect, useState } from "react";

export default function WidgetCard({ widget, onDelete, onEdit }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(widget.api);
      const json = await res.json();
      setData(json);
      setError("");
    } catch {
      setError("Failed to fetch API");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, widget.refresh * 1000);
    return () => clearInterval(interval);
  }, []);

  const getFieldValue = (obj: any, path: string) =>
    path.split(".").reduce((acc: any, k: string) => acc?.[k], obj);

  return (
    <div className="bg-gray-800 p-4 rounded border border-gray-700">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold mb-2">{widget.name}</h3>

        <div className="flex gap-3">
          <button className="text-yellow-400" onClick={onEdit}>✏️</button>
          <button className="text-red-400" onClick={onDelete}>✖</button>
        </div>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {data && widget.fields?.length > 0 && (
        <div className="space-y-2">
          {widget.fields.map((field: string, i: number) => (
            <p key={i} className="text-lg">
              {field} :
              <span className="text-green-400 font-bold">
                {" "}
                {getFieldValue(data, field) ?? "❓ Not Found"}
              </span>
            </p>
          ))}
        </div>
      )}

      {!widget.fields?.length && data && (
        <pre className="bg-black/40 p-3 rounded max-h-40 overflow-auto text-sm">
{JSON.stringify(data, null, 2)}
        </pre>
      )}

      <p className="text-gray-500 text-xs mt-2">
        Refresh every {widget.refresh}s
      </p>
    </div>
  );
}
