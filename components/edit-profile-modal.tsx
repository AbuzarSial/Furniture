'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/contexts/auth-context';
import { Upload, X, User } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile, isLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    user?.profilePicture
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens/closes
  const resetForm = useCallback(() => {
    if (user) {
      setName(user.name || '');
      setProfilePicture(user.profilePicture);
      setPreviewImage(null);
      setError('');
    }
  }, [user]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '');
      setProfilePicture(user.profilePicture);
      setPreviewImage(null);
      setError('');
    }
  }, [isOpen, user]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setProfilePicture(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // Use preview image if available, otherwise keep existing
      const pictureToSave = previewImage || profilePicture;

      await updateProfile({
        name: name.trim(),
        profilePicture: pictureToSave,
      });

      onClose();
    } catch {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const displayImage = previewImage || profilePicture;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl depth-shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and picture
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-xl">
                <AvatarImage
                  src={displayImage || undefined}
                  alt={name || 'Profile'}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl sm:text-5xl bg-primary/10 text-primary">
                  {name ? getInitials(name) : 'U'}
                </AvatarFallback>
              </Avatar>
              {displayImage && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="profile-picture-upload"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full px-6 py-3"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {displayImage ? 'Change Picture' : 'Upload Picture'}
                </Button>
              </motion.div>
              {displayImage && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveImage}
                    className="rounded-full px-6 py-3"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </motion.div>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center max-w-sm">
              Upload a profile picture (JPG, PNG, or GIF, max 5MB)
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="rounded-lg bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto rounded-full px-8 py-6"
              disabled={isSaving || isLoading}
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto rounded-full px-8 py-6 depth-shadow-lg"
              disabled={isSaving || isLoading || !name.trim()}
            >
              {isSaving || isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
