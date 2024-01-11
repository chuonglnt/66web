"use client";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  serverTimestamp,
  addDoc,
  query,
} from "firebase/firestore";
import { db } from "@/Lib/firebase";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { id } from "date-fns/locale";
import { useEffect } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface CatelogyModel {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
export default function ContactPage() {
  const [CatelogyData, setCatelogyData] = useState<CatelogyModel>({
    id: 0,
    name: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });

  const getAllCategories = async (): Promise<CatelogyModel[]> => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "Categories")));
      return querySnapshot.docs.map((doc) => doc.data() as CatelogyModel);
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  };

  // const [categories, setCategories] = useState<CatelogyModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesFromDb = await getAllCategories();
        console.log(
          "categoriesFromDb********************************:",
          categoriesFromDb
        );
        setCatelogyData(categoriesFromDb as any);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEdit(params.row.id)}>Edit</button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </>
      ),
    },
  ];

  const handleAddNewCategory = async (CatelogyData: CatelogyModel) => {
    try {
      console.log(
        "Category added with ID***********************************:",
        CatelogyData
      );
      alert("Thêm mới thành công:");
      const docRef = await addDoc(collection(db, "Categories"), CatelogyData);

      console.log(
        "Category added with ID***********************************:",
        docRef
      );
      return docRef; // Trả về UID của category vừa tạo
    } catch (error) {
      console.error("Error adding category:", error);
      return null; // Trả về null nếu có lỗi
    }
  };

  const handleEdit = (uid: any) => {
    const updateCategory = async (id: string, CatelogyData: CatelogyModel) => {
      const categoryRef = doc(db, "Catelogys", id);

      await updateDoc(categoryRef, {
        ...CatelogyData,
        UpdatedAt: serverTimestamp(),
      });
    };

    alert("Thêm mới thành công:");
    console.log("Sửa mới thành công:", updateCategory);
  };

  const handleDelete = (uid: any) => {
    console.log("Xóa");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCatelogyData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="items-center text-xl">
        <h1>Danh Mục Page</h1>
        <label></label>
        <input
          name="name"
          value={CatelogyData.name}
          type="text"
          placeholder="Tên danh mục"
          onChange={handleChange}
        />
        <input
          name="description"
          value={CatelogyData.description}
          type="text"
          placeholder="Mô tả"
          onChange={handleChange}
        />
        <button
          onClick={() => handleAddNewCategory(CatelogyData)}
          className="bg-green-default text-white mx-2"
        >
          Thêm
        </button>
        <button
          onClick={handleEdit}
          className="bg-green-default text-white mx-2"
        >
          Sửa
        </button>
        <button
          onClick={handleDelete}
          className="bg-green-default text-white mx-2"
        >
          xóa
        </button>
      </div>
      <div>
        <table className="w-full items-center">
          <thead className="text-xl">
            <tr className="text-xl hover:bg-green-200">
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {Array.isArray(CatelogyData) &&
              CatelogyData.map((category) => (
                <tr
                  key={category.id}
                  className="text-xl hover:bg-green-200 border-dashed border-2 border-green-500"
                >
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="bg-green-default text-white mx-2"
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-400 text-white mx-2 items-center"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
