'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/contexts/auth-context';
import { Edit, Mail, User as UserIcon, ArrowLeft } from 'lucide-react';
import { EditProfileModal } from '@/components/edit-profile-modal';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="rounded-full px-4 py-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Manage your profile information and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl depth-shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl sm:text-2xl">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-xl">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl sm:text-5xl bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {user.profilePicture && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Edit className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </motion.div>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {user.profilePicture ? 'Profile picture uploaded' : 'No profile picture'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-8 space-y-6">
                {/* Name */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p className="text-base sm:text-lg font-semibold">{user.name}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="text-base sm:text-lg font-semibold">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Read-only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="pt-6 border-t">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full sm:w-auto rounded-full px-8 py-6 text-base sm:text-lg depth-shadow-lg"
                    size="lg"
                  >
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
