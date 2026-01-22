'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockOrders } from '@/lib/data/orders';
import {
  User,
  Package,
  Calendar,
  DollarSign,
  Edit,
  FileText,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import type { Order } from '@/lib/data/orders';
import { useAuth } from '@/lib/contexts/auth-context';
import { EditProfileModal } from '@/components/edit-profile-modal';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'shipped':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'pending':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // Redirect if not authenticated - use useEffect to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined' && (!isAuthenticated || !user)) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);
  
  if (!isAuthenticated || !user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="border-0 bg-muted/30 depth-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <Separator />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link href="/profile">View Full Profile</Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 bg-muted/30 depth-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Order History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrders.length > 0 ? (
                <div className="space-y-6">
                  {mockOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(order.status)}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>${order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 sm:mt-0 rounded-lg"
                            onClick={() => handleViewDetails(order)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </motion.div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ${(item.quantity * item.price).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>

                      {order.id !== mockOrders[mockOrders.length - 1].id && (
                        <Separator className="mt-6" />
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No orders yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your orders here.
                  </p>
                  <Button asChild>
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-lg max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  <span>Order {selectedOrder.id}</span>
                  <Badge
                    variant="outline"
                    className={getStatusColor(selectedOrder.status)}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Order placed on{' '}
                  {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-base">{item.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Quantity: {item.quantity} × ${item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shipping Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </h3>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium mb-1">
                          Shipping Address
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.shippingAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${selectedOrder.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">
                        ${selectedOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Order Status</h3>
                  <div className="space-y-3">
                    {['pending', 'processing', 'shipped', 'delivered'].map(
                      (status, index) => {
                        const statusIndex = [
                          'pending',
                          'processing',
                          'shipped',
                          'delivered',
                        ].indexOf(selectedOrder.status);
                        const isCompleted = index <= statusIndex;
                        const isCurrent = index === statusIndex;

                        return (
                          <div
                            key={status}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                isCompleted
                                  ? 'bg-primary'
                                  : 'bg-muted-foreground/30'
                              } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            />
                            <div className="flex-1">
                              <p
                                className={`font-medium ${
                                  isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </p>
                            </div>
                            {isCurrent && (
                              <Badge
                                variant="outline"
                                className={getStatusColor(selectedOrder.status)}
                              >
                                Current
                              </Badge>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsOrderDetailsOpen(false)}
                    className="rounded-lg"
                  >
                    Close
                  </Button>
                </motion.div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
