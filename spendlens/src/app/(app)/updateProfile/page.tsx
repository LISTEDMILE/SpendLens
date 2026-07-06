"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

interface Profile {
    _id: string;
    name: string;
    avatar: string;
}

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");

    const [avatar, setAvatar] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [preview, setPreview] = useState("");
    const { update } = useSession();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/updateProfile");

                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message);
                    return;
                }

                const profile: Profile = data.data;

                setName(profile.name);
                setAvatar(profile.avatar);
                setPreview(profile.avatar);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        setPreview(URL.createObjectURL(file));
    };

    const updateProfile = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("name", name);

            if (imageFile) {
                formData.append("avatar", imageFile);
            }

            const response = await fetch("/api/updateProfile", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);

            await update({
                name: data.data.name,
                image: data.data.avatar,
            });

            if (data.data.avatar) {
                setAvatar(data.data.avatar);
                setPreview(data.data.avatar);
            }
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-xl p-6">
            <div className="rounded-xl border bg-background p-8 shadow-lg">
                <h1 className="mb-8 text-3xl font-bold">Profile</h1>

                <div className="flex flex-col items-center gap-6">
                    <Image
                        src={preview || "/default-avatar.png"}
                        alt="Avatar"
                        width={140}
                        height={140}
                        className="rounded-full border object-cover"
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="w-full space-y-2">
                        <Label>Name</Label>

                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="w-full space-y-2">
                        <Label>Current Avatar URL</Label>

                        <Input value={avatar} disabled />
                    </div>

                    <Button
                        className="w-full"
                        disabled={saving}
                        onClick={updateProfile}
                    >
                        {saving ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
