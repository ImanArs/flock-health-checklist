"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, ClipboardList } from "lucide-react"

export default function HistoryPage() {
  const [inspections, setInspections] = useState([])
  const [newInspection, setNewInspection] = useState({ date: "", count: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedInspections = localStorage.getItem("inspections")
    if (savedInspections) {
      setInspections(JSON.parse(savedInspections))
    }
  }, [])

  const handleAddInspection = () => {
    if (newInspection.date.trim() === "" || newInspection.count.trim() === "") return

    const inspection = {
      id: Date.now(),
      date: newInspection.date,
      count: Number.parseInt(newInspection.count),
      timestamp: new Date().toISOString(),
    }

    const updatedInspections = [inspection, ...inspections]
    setInspections(updatedInspections)
    localStorage.setItem("inspections", JSON.stringify(updatedInspections))

    setNewInspection({ date: "", count: "" })
    setIsDialogOpen(false)
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-red-800">Inspection History</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mb-6 bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Inspection
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-red-50">
          <DialogHeader>
            <DialogTitle className="text-red-800">Record New Inspection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="inspection-date" className="text-red-800">
                Inspection Date
              </Label>
              <Input
                id="inspection-date"
                type="date"
                value={newInspection.date}
                onChange={(e) => setNewInspection({ ...newInspection, date: e.target.value })}
                className="border-red-200 focus:border-red-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chicken-count" className="text-red-800">
                Chickens Inspected
              </Label>
              <Input
                id="chicken-count"
                type="number"
                value={newInspection.count}
                onChange={(e) => setNewInspection({ ...newInspection, count: e.target.value })}
                className="border-red-200 focus:border-red-400"
              />
            </div>
            <Button onClick={handleAddInspection} className="w-full bg-red-600 hover:bg-red-700">
              Save Inspection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {inspections.length === 0 ? (
        <Card className="bg-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-red-700 py-8">No inspection records yet. Add your first inspection!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {inspections.map((inspection) => (
            <Card key={inspection.id} className="bg-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="bg-red-200 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-red-700" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-red-900">
                      {new Date(inspection.date).toLocaleDateString("en-EN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex items-center mt-1">
                      <ClipboardList className="h-4 w-4 text-red-600 mr-1" />
                      <p className="text-sm text-red-700">
                        {inspection.count} {inspection.count === 1 ? "chicken" : "chickens"} inspected
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

