"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  User,
  Mail,
  MapPin,
  Trash2,
  UserX,
  Eye,
  EyeOff,
  Settings2,
  LogOut,
  Camera,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Image from "next/image";

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  const [accountNumber, setAccountNumber] = useState("");

  // Sync Clerk User data to local state
  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata || {};

      // Handle Account Number Generation/Retrieval
      if (!metadata.accountNumber) {
        const newNum = Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString();
        setAccountNumber(newNum);
        user.update({ unsafeMetadata: { ...metadata, accountNumber: newNum } });
      } else {
        setAccountNumber(metadata.accountNumber);
      }

      setFormData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: metadata.address || "",
      });
    }
  }, [isLoaded, user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          address: formData.address,
        },
      });
      toast.success("Profile synced with Kambit Cloud");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return <ProfileLoader />;

  return (
    <motion.div
      variants={variants.container}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8 pb-20"
    >
      {/* Header & Identity Section */}
      <motion.div
        variants={variants.item}
        className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
              <Image
                src={user?.imageUrl}
                alt="Avatar"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {user?.firstName || "Kambit User"} {user?.lastName}
              </h1>
              <BadgeCheck className="text-emerald-500 w-6 h-6 fill-emerald-50" />
            </div>
            <p className="text-slate-500 font-medium">
              @{user?.username || "user"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="h-12 rounded-xl flex-1 md:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex-1 md:flex-none px-8 font-bold"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto px-8 font-bold"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Data */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User size={18} className="text-indigo-600" /> Identity
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="First Name" icon={<User size={14} />}>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      disabled={!isEditing}
                      className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200"
                    />
                  </ProfileField>
                  <ProfileField label="Last Name" icon={<User size={14} />}>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      disabled={!isEditing}
                      className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200"
                    />
                  </ProfileField>
                  <ProfileField
                    label="Public Username"
                    icon={<BadgeCheck size={14} />}
                  >
                    <Input
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      disabled={!isEditing}
                      className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200"
                    />
                  </ProfileField>
                  <ProfileField
                    label="Email Address (Locked)"
                    icon={<Mail size={14} />}
                  >
                    <Input
                      value={user?.primaryEmailAddress?.emailAddress || ""}
                      disabled
                      className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-medium opacity-70"
                    />
                  </ProfileField>
                  <div className="md:col-span-2">
                    <ProfileField
                      label="Residential Address"
                      icon={<MapPin size={14} />}
                    >
                      <Input
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        disabled={!isEditing}
                        placeholder="Set your physical address"
                        className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200"
                      />
                    </ProfileField>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Ledger Info & Security */}
        <div className="space-y-8">
          <motion.div variants={variants.item}>
            <Card className="bg-slate-900 text-white border-none rounded-[2rem] shadow-2xl overflow-hidden relative">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Kambit Ledger Number
                  </p>
                  <div className="flex items-center justify-between group">
                    <h3 className="text-2xl font-mono font-bold tracking-tighter">
                      {showAccountNumber
                        ? accountNumber.replace(
                            /(\d{3})(\d{3})(\d{4})/,
                            "$1 $2 $3"
                          )
                        : "•••• ••• ••••"}
                    </h3>
                    <button
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="text-slate-500 hover:text-white"
                    >
                      {showAccountNumber ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">
                      Status
                    </span>
                    <span className="text-emerald-400 font-bold uppercase">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">
                      Type
                    </span>
                    <span className="font-bold uppercase tracking-tighter">
                      Personal Settlement
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={variants.item} className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
              Account Management
            </h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl justify-between border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 px-6 font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <UserX size={18} /> Deactivate Account
                  </span>
                  <Settings2
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2rem] border-slate-200">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl font-heading font-bold">
                    <AlertTriangle className="text-amber-500" /> Temporarily
                    Deactivate?
                  </DialogTitle>
                  <DialogDescription className="py-4">
                    Your Kambit wallet will be frozen and hidden from peers. You
                    can reactivate by logging back in within 30 days.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3">
                  <DialogClose asChild>
                    <Button variant="outline" className="rounded-xl">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="bg-amber-600 hover:bg-amber-700 rounded-xl">
                    Deactivate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full h-14 rounded-2xl justify-between bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30 border border-rose-100 px-6 font-bold">
                  <span className="flex items-center gap-3">
                    <Trash2 size={18} /> Permanent Deletion
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2rem] border-rose-200">
                <DialogHeader>
                  <DialogTitle className="text-rose-600 font-heading font-bold text-2xl">
                    Critical Action
                  </DialogTitle>
                  <DialogDescription className="py-2 font-medium text-slate-600">
                    This will permanently wipe your transaction history, keys,
                    and linked bank accounts. This cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 text-rose-700 text-xs font-bold leading-relaxed">
                  NOTE: Ensure all balances are withdrawn to ₦0.00 before
                  proceeding. Remaining funds will be lost.
                </div>
                <DialogFooter className="pt-4">
                  <Button
                    variant="destructive"
                    className="w-full h-12 rounded-xl font-bold bg-rose-600"
                    onClick={() => user?.delete()}
                  >
                    Confirm Final Deletion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="pt-4">
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="w-full h-14 rounded-2xl text-slate-400 hover:text-rose-500 font-bold uppercase tracking-widest text-[10px]"
                >
                  <LogOut size={14} className="mr-2" /> Sign Out Session
                </Button>
              </SignOutButton>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component for Fields
function ProfileField({ label, icon, children }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function ProfileLoader() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-8 animate-pulse">
      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 rounded-[2rem] bg-slate-200" />
        <div className="space-y-3">
          <div className="h-8 w-48 bg-slate-200 rounded-lg" />
          <div className="h-4 w-24 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-[400px] bg-slate-50 rounded-[2rem]" />
        <div className="h-[400px] bg-slate-50 rounded-[2rem]" />
      </div>
    </div>
  );
}
