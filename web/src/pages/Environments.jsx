import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";
import ReactJson from '@microlink/react-json-view';

import { 
  Card, CardContent, CardHeader, CardTitle 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { 
  Trash2, RotateCcw, Eye, EyeOff, Plus, Edit, Save, X, Copy, Database, 
  Check
} from "lucide-react";

import ConfirmDialog from "../components/ui/confirm-dialog";

export default function Environments() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);

  const [envs, setEnvs] = useState([]);
  const [name, setName] = useState("");
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [dataKey, setDataKey] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [envData, setEnvData] = useState({});
  const [editKey, setEditKey] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [rotatedKey, setRotatedKey] = useState(null);
  const [isCopying, setIsCopying] = useState(false);


  const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmTitle, setConfirmTitle] = useState("");
const [confirmDescription, setConfirmDescription] = useState("");
const [confirmAction, setConfirmAction] = useState(() => () => {});


function openDeleteEnvDialog(envId) {
  setConfirmTitle("Delete Environment");
  setConfirmDescription("Are you sure you want to delete this environment? This action cannot be undone.");
  setConfirmAction(() => async () => {
    await api.del(`/api/environments/${envId}`, token);
    setEnvs((prev) => prev.filter((e) => e._id !== envId));
    if (selectedEnv === envId) setSelectedEnv(null);
  });
  setConfirmOpen(true);
}


function openDeleteVariableDialog(envId, key) {
  setConfirmTitle("Delete Variable");
  setConfirmDescription(`Are you sure you want to delete the variable "${key}"? This action cannot be undone.`);
  setConfirmAction(() => async () => {
    await api.del(`/api/environments/${envId}/data/${key}`, token);
    const res = await api.get(`/api/environments/${envId}/data`, token);
    setEnvData((prev) => ({ ...prev, [envId]: res }));
  });
  setConfirmOpen(true);
}



function openDeleteVariableDialog(envId, key) {
  setConfirmTitle("Delete Variable");
  setConfirmDescription(`Are you sure you want to delete the variable "${key}"? This action cannot be undone.`);
  setConfirmAction(() => async () => {
    await api.del(`/api/environments/${envId}/data/${key}`, token);
    const res = await api.get(`/api/environments/${envId}/data`, token);
    setEnvData((prev) => ({ ...prev, [envId]: res }));
  });
  setConfirmOpen(true);
}


function openDeleteProjectDialog() {
  setConfirmTitle("Delete Project");
  setConfirmDescription("Are you sure you want to delete this project? This action cannot be undone.");
  setConfirmAction(() => async () => {
    await api.del(`/api/projects/${projectId}`, token);
    navigate("/dashboard");
  });
  setConfirmOpen(true);
}



  // 🔹 Fetch environments
  useEffect(() => {
    if (!projectId) return;
    (async () => {
      const res = await api.get(`/api/projects/${projectId}/environments`, token);
      setEnvs(res);
    })();
  }, [projectId, token]);

  // 🔹 Create environment
  async function createEnv(e) {
    e.preventDefault();
    const res = await api.post(
      `/api/projects/${projectId}/environments`,
      { name },
      token
    );
    setEnvs((prev) => [res, ...prev]);
    setName("");
  }

  // 🔹 Rotate Key
  async function rotate(envId) {
    const res = await api.post(`/api/environments/${envId}/rotate-key`, {}, token);
    setRotatedKey(res.apiKey);
  }

  // 🔹 Toggle environment data
  async function toggleEnv(envId) {
    if (selectedEnv === envId) {
      setSelectedEnv(null);
      return;
    }
    setSelectedEnv(envId);
    const res = await api.get(`/api/environments/${envId}/data`, token);
    setEnvData((prev) => ({ ...prev, [envId]: res }));
  }

  // 🔹 Add / Update variable
  async function upsert() {
    if (!selectedEnv) return;
    let parsed;
    try {
      parsed = JSON.parse(dataValue);
    } catch {
      parsed = dataValue;
    }

    await api.post(
      `/api/environments/${selectedEnv}/data`,
      { key: dataKey, value: parsed },
      token
    );

    const res = await api.get(`/api/environments/${selectedEnv}/data`, token);
    setEnvData((prev) => ({ ...prev, [selectedEnv]: res }));

    setDataKey("");
    setDataValue("");
  }

  // 🔹 Change status active/inactive
  async function changeStatus(envId, key, currentStatus) {
    await api.patch(`/api/environments/${envId}/data/${key}/status`, token);
    const res = await api.get(`/api/environments/${envId}/data`, token);
    setEnvData((prev) => ({ ...prev, [envId]: res }));
  }

  // 🔹 Save edited variable
  async function saveEdit(envId, key) {
    let parsed;
    try {
      parsed = JSON.parse(editValue);
    } catch {
      parsed = editValue;
    }

    await api.put(
      `/api/environments/${envId}/data/${key}`,
      { value: parsed },
      token
    );
    const res = await api.get(`/api/environments/${envId}/data`, token);
    setEnvData((prev) => ({ ...prev, [envId]: res }));

    setEditKey(null);
    setEditValue("");
  }

  
 

  // 🔹 Copy rotated key
  function copyKey() {
    if (rotatedKey) {
      setIsCopying(true);
      navigator.clipboard.writeText(rotatedKey);
      setTimeout(()=>{
         setRotatedKey(null);
         setIsCopying(false)
      },2000);
     
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 md:p-6 p-0 pt-2">
      <div className="max-w-6xl space-y-6">
        
        <div className="flex justify-center items-center flex-col gap-3 text-center lg:flex-row lg:text-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Environments</h1>
            <p className="text-muted-foreground mt-1">
              Manage your project environments and feature flags
            </p>
          </div>
          <Button onClick={openDeleteProjectDialog} variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Project
          </Button>
        </div>

        {/* Rotated API Key Alert */}
        {rotatedKey && (
          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex justify-between sm:items-center  flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-yellow-600" />
                  <span className="font-mono text-[10px] sm:text-base   px-1 py-1 rounded overflow-ellipsis">
                    API Key: {rotatedKey}
                  </span>
                </div>
                <Button onClick={copyKey} size="sm" className="bg-yellow-600 hover:bg-yellow-700 gap-2">
                  {!isCopying &&<Copy className="w-4 h-4" />}
                  {isCopying && <Check className="w-4 h-4" />}
                  {isCopying ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Environment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Environment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createEnv} className="flex gap-3 flex-col lg:flex-row">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Environment name (e.g., Development, Staging, Production)"
                className="flex-1 placeholder:text-xs md:placeholder:text-md"
              />
              <Button type="submit" className="gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Environments List */}
        <div className="space-y-4">
          {envs.map((env) => (
            <Card key={env._id} className="shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <div className="flex lg:justify-between lg:items-center flex-col gap-3 items-start lg:flex-row">
                  <div>
                    <CardTitle className="text-xl">{env.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Environment ID: {env._id}</p>
                  </div>
                  <div className="flex gap-2 flex-row flex-wrap">
                    <Button onClick={() => rotate(env._id)} variant="outline" size="sm" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Rotate Key
                    </Button>
                    <Button onClick={() => toggleEnv(env._id)} variant="outline" size="sm" className="gap-2">
                      {selectedEnv === env._id ? (
                        <>
                          <EyeOff className="w-4 h-4" /> Hide Data
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" /> Show Data
                        </>
                      )}
                    </Button>
                    <Button onClick={() => openDeleteEnvDialog(env._id)} variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Environment Data */}
              {selectedEnv === env._id && (
                <>
                  <Separator />
                  <CardContent className="p-6 space-y-6">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Environment Variables
                    </h4>

                    {/* Existing Variables */}
                    <div className="space-y-3">
                      {envData[env._id] && Object.keys(envData[env._id]).length > 0 ? (
                        Object.entries(envData[env._id]).map(([k, v]) => (
                          <Card key={k} className="bg-secondary/20 border-secondary">
                            <CardContent className="p-4">
                              {editKey === k ? (
                                <div className="flex gap-2">
                                  <Input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1"
                                    placeholder="Enter JSON value"
                                  />
                                  <Button onClick={() => saveEdit(env._id, k)} size="sm" className="gap-2">
                                    <Save className="w-4 h-4" /> Save
                                  </Button>
                                  <Button onClick={() => setEditKey(null)} variant="outline" size="sm" className="gap-2">
                                    <X className="w-4 h-4" /> Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex justify-between items-start gap-4  flex-col lg:flex-row">
                                  <div className="flex-1 space-y-2  w-full">
                                    <div className="font-mono text-sm font-semibold text-primary">
                                      {k}
                                    </div>
                                    <div className="bg-background rounded-lg p-3 border w-full">
                                      <ReactJson
                                        src={{ [k]: v.value }}
                                        theme="rjv-default"
                                        displayDataTypes={false}
                                        displayObjectSize={false}
                                        enableClipboard={true}
                                        collapsed={false}
                                        name={false}
                                        style={{ fontSize: '12px' }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-2 items-center flex-row">
                                    <Button
                                      onClick={() => {
                                        setEditKey(k);
                                        setEditValue(JSON.stringify(v.value, null, 2));
                                      }}
                                      variant="ghost"
                                      size="sm"
                                      className="gap-2"
                                    >
                                      <Edit className="w-4 h-4" /> Edit
                                    </Button>
                                    <Badge
                                      variant={v.status === "active" ? "default" : "secondary"}
                                      className={`cursor-pointer ${
                                        v.status === "active"
                                          ? "bg-green-500 hover:bg-green-600"
                                          : "bg-gray-400 hover:bg-gray-500"
                                      }`}
                                      onClick={() => changeStatus(env._id, k, v.status)}
                                    >
                                      {v.status}
                                    </Badge>
                                    <Button
                                     onClick={() => openDeleteVariableDialog(env._id, k)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive gap-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card className="border-dashed border-2 border-muted">
                          <CardContent className="p-8 text-center">
                            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No variables yet. Add your first environment variable below.</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Add New Variable */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Add New Variable</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3 flex-col lg:flex-row">
                          <Input
                            value={dataKey}
                            onChange={(e) => setDataKey(e.target.value)}
                            placeholder="Variable key (e.g., DB_URL, FEATURE_FLAG)"
                            className="w-full lg:w-1/3 placeholder:text-xs md:placeholder:text-md"
                          />
                          <Input
                            value={dataValue}
                            onChange={(e) => setDataValue(e.target.value)}
                            placeholder='Value (JSON format: "string", 123, true, {"key": "value"})'
                            className="flex-1 w-full lg:w-1/3 placeholder:text-xs md:placeholder:text-md"
                          />
                          <Button onClick={upsert} className="gap-2">
                            <Plus className="w-4 h-4" /> Add Variable
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {envs.length === 0 && (
          <Card className="border-dashed border-2 border-muted flex flex-col justify-center items-center">
            <CardContent className="p-16 text-center">
              <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No environments yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first environment to start managing feature flags and configuration variables!
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Create Environment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={confirmTitle}
        description={confirmDescription}
        onConfirm={confirmAction}
      />
    </div>
  );
}
