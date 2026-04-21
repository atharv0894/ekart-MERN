import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const { userId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zip: user?.zipCode || "",
  });

  const handleChange = (field) => (e) => {
    setUpdateUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ phone validation
    if (!updateUser.phone || updateUser.phone.trim() === "") {
      toast.error("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/update-user/${userId}`,
        {
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          phoneNo: updateUser.phone,
          address: updateUser.address,
          city: updateUser.city,
          zipCode: updateUser.zip,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const updated = {
          ...user,
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          phoneNo: updateUser.phone,
          address: updateUser.address,
          city: updateUser.city,
          zipCode: updateUser.zip,
        };
        dispatch(setUser(updated));
        localStorage.setItem("user", JSON.stringify(updated));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-accent flex justify-center">
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <div className="w-full max-w-2xl px-4">
        <Tabs defaultValue="profile">
          <TabsList className="flex justify-center mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* ── Profile Tab ── */}
          <TabsContent value="profile">
            <h2 className="text-2xl font-bold text-center mb-6">
              Update Profile
            </h2>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name Row */}
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                      <Label>First Name</Label>
                      <Input
                        placeholder="John"
                        value={updateUser.firstName}
                        onChange={handleChange("firstName")}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Last Name</Label>
                      <Input
                        placeholder="Doe"
                        value={updateUser.lastName}
                        onChange={handleChange("lastName")}
                      />
                    </div>
                  </div>

                  {/* Email - disabled */}
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={updateUser.email}
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone - required */}
                  <div className="space-y-1">
                    <Label>Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="Enter your Contact No"
                      value={updateUser.phone}
                      onChange={handleChange("phone")}
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <Label>Address</Label>
                    <Input
                      placeholder="Enter your Address"
                      value={updateUser.address}
                      onChange={handleChange("address")}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <Label>City</Label>
                    <Input
                      placeholder="Enter your City"
                      value={updateUser.city}
                      onChange={handleChange("city")}
                    />
                  </div>

                  {/* Zip */}
                  <div className="space-y-1">
                    <Label>Zip Code</Label>
                    <Input
                      placeholder="Enter your ZipCode"
                      value={updateUser.zip}
                      onChange={handleChange("zip")}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Orders Tab ── */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have no recent orders.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;