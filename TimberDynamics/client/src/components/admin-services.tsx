import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Service, InsertService } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";

export default function AdminServices() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<InsertService>({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    isActive: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const createMutation = useMutation({
    mutationFn: async (service: InsertService) => {
      const res = await apiRequest("POST", "/api/services", service);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setIsAddDialogOpen(false);
      setNewService({ name: "", description: "", category: "", imageUrl: "", isActive: true });
      toast({ title: "Service created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create service", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, service }: { id: number; service: Partial<InsertService> }) => {
      const res = await apiRequest("PUT", `/api/services/${id}`, service);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setEditingService(null);
      toast({ title: "Service updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update service", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Service deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete service", variant: "destructive" });
    },
  });

  const handleCreateService = () => {
    createMutation.mutate(newService);
  };

  const handleUpdateService = (service: Service) => {
    updateMutation.mutate({ id: service.id, service });
  };

  const handleDeleteService = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="mb-8">
        <h1 className="font-bold text-3xl warm-gray mb-2">Manage Services</h1>
        <p className="text-gray-600">Add, edit, or remove your business services.</p>
      </div>
      
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Current Services</h3>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) => setNewService({ ...newService, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Materials">Materials</SelectItem>
                        <SelectItem value="Doors">Doors</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Interior">Interior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={newService.imageUrl}
                      onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateService} 
                    className="w-full"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Create Service
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Service Name</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services?.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-3 px-4">{service.name}</td>
                    <td className="py-3 px-4">{service.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        service.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingService(service)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Service Name</Label>
                <Input
                  id="edit-name"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingService.category}
                  onValueChange={(value) => setEditingService({ ...editingService, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Materials">Materials</SelectItem>
                    <SelectItem value="Doors">Doors</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Interior">Interior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={editingService.imageUrl || ""}
                  onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                />
              </div>
              <Button 
                onClick={() => handleUpdateService(editingService)} 
                className="w-full"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Update Service
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
