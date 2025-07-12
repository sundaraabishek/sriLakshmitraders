import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { InsertInquiry } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (inquiry: InsertInquiry) => {
      const res = await apiRequest("POST", "/api/inquiries", inquiry);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      setFormData({ name: "", email: "", message: "" });
      toast({ title: "Message sent successfully! We'll get back to you soon." });
    },
    onError: () => {
      toast({ title: "Failed to send message. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      serviceId: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wood-brown"
      />
      <Input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wood-brown"
      />
      <Textarea
        placeholder="Your Message"
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wood-brown"
      />
      <Button 
        type="submit" 
        disabled={submitMutation.isPending}
        className="w-full bg-wood-brown text-white py-3 rounded-lg font-medium hover:bg-wood-light transition-colors"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
