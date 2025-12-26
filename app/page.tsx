"use client";

import { useState, useEffect } from "react";
import WidgetCard from "./WidgetCard";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [widgetName, setWidgetName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [refresh, setRefresh] = useState(10);
  const [fieldsInput, setFieldsInput] = useState("");
  const [sample, setSample] = useState<any>(null);

  const [widgets, setWidgets] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("widgets");
    if (saved) setWidgets(JSON.parse(saved));
  }, []);

  const saveWidgets = (data: any[]) => {
    setWidgets(data);
    localStorage.setItem("widgets", JSON.stringify(data));
  };

  const fetchSample = async () => {
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      setSample(json);
    } catch {
      alert("Failed to fetch API");
    }
  };

  const addWidget = () => {
    if (!widgetName || !apiUrl) return;

    const fields = fieldsInput.split(",").map(f => f.trim()).filter(Boolean);

    saveWidgets([
      ...widgets,
      { id: Date.now(), name: widgetName, api: apiUrl, refresh, fields }
    ]);

    closeModal();
  };

  const openEdit = (widget: any) => {
    setIsEdit(true);
    setEditId(widget.id);
    setWidgetName(widget.name);
    setApiUrl(widget.api);
    setRefresh(widget.refresh);
    setFieldsInput(widget.fields?.join(", ") || "");
    setSample(null);
    setShowModal(true);
  };

  const updateWidget = () => {
    const fields = fieldsInput.split(",").map(f => f.trim()).filter(Boolean);

    const updated = widgets.map(w =>
      w.id === editId
        ? { ...w, name: widgetName, api: apiUrl, refresh, fields }
        : w
    );

    saveWidgets(updated);
    closeModal();
  };

  const deleteWidget = (id: number) => {
    saveWidgets(widgets.filter(w => w.id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setWidgetName("");
    setApiUrl("");
    setRefresh(10);
    setFieldsInput("");
    setSample(null);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = [...widgets];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    saveWidgets(reordered);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 transition">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>

        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded"
          onClick={() => { setShowModal(true); setIsEdit(false); }}
        >
          + Add Widget
        </button>
      </div>

      {/* Drag + Drop Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {widgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <WidgetCard
                        widget={widget}
                        onDelete={() => deleteWidget(widget.id)}
                        onEdit={() => openEdit(widget)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-[480px]">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Widget" : "Add New Widget"}
            </h2>

            <input
              type="text"
              placeholder="Widget Name"
              className="w-full p-2 mb-3 rounded text-white bg-gray-700 placeholder-gray-300"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
            />

            <input
              type="text"
              placeholder="API URL"
              className="w-full p-2 mb-3 rounded text-white bg-gray-700 placeholder-gray-300"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />

            <button className="bg-blue-500 px-3 py-2 rounded mb-3" onClick={fetchSample}>
              Fetch Sample Data
            </button>

            {sample && (
              <pre className="bg-black/40 p-3 rounded max-h-40 overflow-auto text-sm">
{JSON.stringify(sample, null, 2)}
              </pre>
            )}

            <input
              type="text"
              placeholder="rates.INR, rates.EUR"
              className="w-full p-2 mb-3 rounded text-white bg-gray-700 placeholder-gray-300"
              value={fieldsInput}
              onChange={(e) => setFieldsInput(e.target.value)}
            />

            <input
              type="number"
              placeholder="Refresh Interval"
              className="w-full p-2 mb-3 rounded text-white bg-gray-700 placeholder-gray-300"
              value={refresh}
              onChange={(e) => setRefresh(Number(e.target.value))}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-600 rounded" onClick={closeModal}>
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-black font-semibold rounded"
                onClick={isEdit ? updateWidget : addWidget}
              >
                {isEdit ? "Save Changes" : "Add Widget"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
