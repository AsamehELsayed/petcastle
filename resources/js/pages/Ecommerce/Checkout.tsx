import { useState, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import GuestLayout from "@/layouts/guest-layout";
import { useCart } from "@/ecommerce/store/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, CreditCard, ChevronRight, Plus, Check, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface Address {
    id: number;
    city: string;
    street: string;
    building: string;
    notes?: string;
}

export default function Checkout({ initialAddresses = [] }: { initialAddresses: Address[] }) {
    const { items, getTotals, clearCart } = useCart();
    const { total, subtotal, savings } = getTotals();
    const { auth }: any = usePage().props;

    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
        initialAddresses.length > 0 ? initialAddresses[0].id : null
    );
    const [isAddingAddress, setIsAddingAddress] = useState(initialAddresses.length === 0);
    const [phone, setPhone] = useState(auth.user?.phone || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New Address Form State
    const [newAddress, setNewAddress] = useState({
        city: "",
        street: "",
        building: "",
        notes: ""
    });

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/addresses", newAddress);
            setAddresses([...addresses, response.data]);
            setSelectedAddressId(response.data.id);
            setIsAddingAddress(false);
            setNewAddress({ city: "", street: "", building: "", notes: "" });
            toast.success("Address added successfully");
        } catch (error) {
            toast.error("Failed to add address");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select or add a shipping address");
            return;
        }
        if (!phone) {
            toast.error("Please enter your phone number");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/checkout", {
                address_id: selectedAddressId,
                items: items.map(i => ({ id: i.id, quantity: i.quantity })),
                payment_method: "cod",
                phone: phone
            });

            toast.success("Order placed successfully!");
            clearCart();
            router.visit("/portal"); // Redirect to customer dashboard
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to place order";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-20" />
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Button onClick={() => router.visit("/products")}>Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className="bg-muted/30 min-h-screen pb-20 pt-10">
            <Head title="Checkout" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Shipping Address Section */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-muted">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                <div className="space-y-4">
                                    {!isAddingAddress && addresses.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {addresses.map((addr) => (
                                                <div 
                                                    key={addr.id}
                                                    onClick={() => setSelectedAddressId(addr.id)}
                                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        selectedAddressId === addr.id 
                                                        ? "border-primary bg-primary/5" 
                                                        : "border-muted hover:border-primary/50"
                                                    }`}
                                                >
                                                    {selectedAddressId === addr.id && (
                                                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                                                            <Check className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                    <p className="font-bold">{addr.city}</p>
                                                    <p className="text-sm text-muted-foreground">{addr.street}, {addr.building}</p>
                                                    {addr.notes && <p className="text-xs text-muted-foreground mt-2 italic">"{addr.notes}"</p>}
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setIsAddingAddress(true)}
                                                className="p-4 rounded-xl border-2 border-dashed border-muted hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center text-muted-foreground gap-2"
                                            >
                                                <Plus className="w-6 h-6" />
                                                <span className="font-bold">Add New Address</span>
                                            </button>
                                        </div>
                                    )}

                                    {isAddingAddress && (
                                        <motion.form 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onSubmit={handleAddAddress} 
                                            className="space-y-4 bg-muted/20 p-4 rounded-2xl"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>City / Area</Label>
                                                    <Input 
                                                        required
                                                        placeholder="e.g. Amman, Dabouq"
                                                        value={newAddress.city}
                                                        onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Street Name</Label>
                                                    <Input 
                                                        required
                                                        placeholder="Main St."
                                                        value={newAddress.street}
                                                        onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Building / Villa Number</Label>
                                                <Input 
                                                    required
                                                    placeholder="e.g. Building 12, Floor 2"
                                                    value={newAddress.building}
                                                    onChange={e => setNewAddress({...newAddress, building: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Special Instructions (Optional)</Label>
                                                <Textarea 
                                                    placeholder="e.g. Near the mosque, or leave at door"
                                                    value={newAddress.notes}
                                                    onChange={e => setNewAddress({...newAddress, notes: e.target.value})}
                                                />
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                {addresses.length > 0 && (
                                                    <Button type="button" variant="ghost" onClick={() => setIsAddingAddress(false)}>Cancel</Button>
                                                )}
                                                <Button type="submit">Save Address</Button>
                                            </div>
                                        </motion.form>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Info Section */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="bg-white border-b border-muted">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-primary" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                <div className="space-y-2 max-w-sm">
                                    <Label>Phone Number</Label>
                                    <Input 
                                        required
                                        placeholder="07XXXXXXXX"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">We'll call you to confirm the delivery.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method Section */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="bg-white border-b border-muted">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Delivery</p>
                                            <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-primary border-primary">FREE</Badge>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                    <strong>Note:</strong> We currently only support Cash on Delivery to ensure the fastest service for our customers.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm sticky top-24">
                            <CardHeader className="bg-white border-b border-muted">
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white space-y-4">
                                <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0">
                                                <img 
                                                    src={item.main_image || item.imageUrl} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold">{(item.price * item.quantity).toFixed(2)} JD</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="pt-4 border-t border-muted space-y-2">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>{subtotal.toFixed(2)} JD</span>
                                    </div>
                                    {savings > 0 && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Savings</span>
                                            <span>-{savings.toFixed(2)} JD</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xl font-black">Total</span>
                                        <span className="text-2xl font-black text-primary">{total.toFixed(2)} JD</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-white p-6 pt-0">
                                <Button 
                                    className="w-full h-14 text-lg font-black bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                                    onClick={handlePlaceOrder}
                                    disabled={isSubmitting || isAddingAddress}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            PLACING ORDER...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            PLACE ORDER
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

Checkout.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
