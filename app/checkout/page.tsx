'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/lib/contexts/cart-context';
import { useAuth } from '@/lib/contexts/auth-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();

  // All hooks must be called before any early returns
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems.length, router]);

  // Redirect unauthenticated users to auth page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`/auth?returnUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if cart is empty (will redirect)
  if (cartItems.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();

  const shippingCosts = {
    standard: 99,
    express: 149,
    overnight: 249,
  };

  const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string | boolean) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock checkout - in real app, this would call payment API
    // Clear cart after successful order
    clearCart();
    // Redirect to order confirmation (or dashboard)
    router.push('/dashboard');
  };

  // Show loading or empty state
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {isAuthenticated
            ? `Welcome back, ${user?.name}! Complete your order with secure payment.`
            : 'Complete your order with secure payment'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Shipping Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        handleShippingChange('firstName', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        handleShippingChange('lastName', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      handleShippingChange('email', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      handleShippingChange('phone', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingChange('address', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingChange('city', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        handleShippingChange('state', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        handleShippingChange('zipCode', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={shippingInfo.country}
                    onValueChange={(value) =>
                      handleShippingChange('country', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Shipping Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Standard Shipping</span>
                        <span className="font-semibold">${shippingCosts.standard}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        5-7 business days
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Express Shipping</span>
                        <span className="font-semibold">${shippingCosts.express}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        2-3 business days
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="overnight"
                      checked={shippingMethod === 'overnight'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Overnight Shipping</span>
                        <span className="font-semibold">${shippingCosts.overnight}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Next business day
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={billingInfo.cardNumber}
                    onChange={(e) =>
                      handleBillingChange('cardNumber', e.target.value)
                    }
                    maxLength={19}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    value={billingInfo.cardName}
                    onChange={(e) =>
                      handleBillingChange('cardName', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={billingInfo.expiryDate}
                      onChange={(e) =>
                        handleBillingChange('expiryDate', e.target.value)
                      }
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={billingInfo.cvv}
                      onChange={(e) =>
                        handleBillingChange('cvv', e.target.value)
                      }
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={billingInfo.sameAsShipping}
                    onChange={(e) =>
                      handleBillingChange('sameAsShipping', e.target.checked)
                    }
                    className="rounded"
                  />
                  <Label htmlFor="sameAsShipping" className="cursor-pointer">
                    Billing address same as shipping address
                  </Label>
                </div>
                {!billingInfo.sameAsShipping && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        value={billingInfo.billingAddress}
                        onChange={(e) =>
                          handleBillingChange('billingAddress', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          value={billingInfo.billingCity}
                          onChange={(e) =>
                            handleBillingChange('billingCity', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State</Label>
                        <Input
                          id="billingState"
                          value={billingInfo.billingState}
                          onChange={(e) =>
                            handleBillingChange('billingState', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input
                          id="billingZip"
                          value={billingInfo.billingZip}
                          onChange={(e) =>
                            handleBillingChange('billingZip', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.color}-${item.size}`} className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        {item.color && (
                          <p className="text-xs text-muted-foreground">
                            Color: {item.color}
                          </p>
                        )}
                        {item.size && (
                          <p className="text-xs text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pb-4">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>

                {/* Place Order Button */}
                <Button type="submit" className="w-full" size="lg">
                  Place Order
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
