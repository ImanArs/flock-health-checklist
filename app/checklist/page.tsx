"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BirdIcon as Chicken, Pencil, Plus } from "lucide-react"
import { getChickens, saveChickens } from "@/lib/chicken-data"

export default function ChecklistPage() {
  const [chickens, setChickens] = useState([])
  const [editingChicken, setEditingChicken] = useState(null)
  const [newChicken, setNewChicken] = useState({ id: "", isHealthy: true })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    setChickens(getChickens())
  }, [])

  const healthyCount = chickens.filter((chicken) => chicken.isHealthy).length
  const sickCount = chickens.length - healthyCount

  const handleAddChicken = () => {
    if (newChicken.id.trim() === "") return

    const updatedChickens = [...chickens, { ...newChicken }]
    setChickens(updatedChickens)
    saveChickens(updatedChickens)
    setNewChicken({ id: "", isHealthy: true })
    setIsAddDialogOpen(false)
  }

  const handleEditChicken = () => {
    if (!editingChicken) return

    const updatedChickens = chickens.map((chicken) => (chicken.id === editingChicken.id ? editingChicken : chicken))

    setChickens(updatedChickens)
    saveChickens(updatedChickens)
    setEditingChicken(null)
    setIsEditDialogOpen(false)
  }

  const startEditing = (chicken) => {
    setEditingChicken({ ...chicken })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-red-800">Chicken Health Checklist</h1>

      <div className="flex justify-between mb-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Chicken
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-red-50">
            <DialogHeader>
              <DialogTitle className="text-red-800">Add New Chicken</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="chicken-id" className="text-red-800">
                  Chicken ID
                </Label>
                <Input
                  id="chicken-id"
                  value={newChicken.id}
                  onChange={(e) => setNewChicken({ ...newChicken, id: e.target.value })}
                  className="border-red-200 focus:border-red-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-red-800">Health Status</Label>
                <RadioGroup
                  value={newChicken.isHealthy ? "healthy" : "sick"}
                  onValueChange={(value) => setNewChicken({ ...newChicken, isHealthy: value === "healthy" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthy" id="healthy" className="text-green-600" />
                    <Label htmlFor="healthy" className="text-green-600">
                      Healthy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sick" id="sick" className="text-red-600" />
                    <Label htmlFor="sick" className="text-red-600">
                      Sick
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleAddChicken} className="w-full bg-red-600 hover:bg-red-700">
                Add Chicken
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3 mb-6">
        {chickens.map((chicken, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-red-100 rounded-lg border border-red-200"
          >
            <div className="flex items-center">
              <Chicken className={`h-6 w-6 ${chicken.isHealthy ? "text-green-600" : "text-red-600"}`} />
              <div className="ml-3">
                <p className="font-medium text-red-900">{chicken.id}</p>
                <p className={`text-sm ${chicken.isHealthy ? "text-green-600" : "text-red-600"}`}>
                  {chicken.isHealthy ? "Healthy" : "Sick"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => startEditing(chicken)}
              className="text-red-700 hover:text-red-900 hover:bg-red-200"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Card className="bg-red-100 border-red-200">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-green-600 font-medium">Healthy:</p>
              <p className="text-2xl font-bold text-green-700">{healthyCount}</p>
            </div>
            <div>
              <p className="text-red-600 font-medium">Sick:</p>
              <p className="text-2xl font-bold text-red-700">{sickCount}</p>
            </div>
            <div>
              <p className="text-red-800 font-medium">Total:</p>
              <p className="text-2xl font-bold text-red-900">{chickens.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-red-50">
          <DialogHeader>
            <DialogTitle className="text-red-800">Edit Chicken</DialogTitle>
          </DialogHeader>
          {editingChicken && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-chicken-id" className="text-red-800">
                  Chicken ID
                </Label>
                <Input
                  id="edit-chicken-id"
                  value={editingChicken.id}
                  onChange={(e) => setEditingChicken({ ...editingChicken, id: e.target.value })}
                  className="border-red-200 focus:border-red-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-red-800">Health Status</Label>
                <RadioGroup
                  value={editingChicken.isHealthy ? "healthy" : "sick"}
                  onValueChange={(value) => setEditingChicken({ ...editingChicken, isHealthy: value === "healthy" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthy" id="edit-healthy" className="text-green-600" />
                    <Label htmlFor="edit-healthy" className="text-green-600">
                      Healthy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sick" id="edit-sick" className="text-red-600" />
                    <Label htmlFor="edit-sick" className="text-red-600">
                      Sick
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleEditChicken} className="w-full bg-red-600 hover:bg-red-700">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

