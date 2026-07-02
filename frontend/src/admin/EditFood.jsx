import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { editFood } from '../api/food.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const EditFood = () => {
  const navigate = useNavigate()
  const location = useLocation() 
  console.log(location);

  // FIX 1: Safely handle missing location state with optional chaining and fallback
  const food = location?.state || {};
  
  // FIX 2: Removed duplicate state declarations. Safely fallback to empty strings.
  const [formData, setFormData] = useState({
    name: food.name || '',
    price: food.price || '',
    description: food.description || '',
    photo: food.photo || '',
    category: food.category || 'Fast Food',
  })
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(food.photo || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const queryClient = useQueryClient()

  // FIX 3: Retain historical values using the spread operator (...prev)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const editMutation = useMutation({
    // FIX 4: useMutation accepts only ONE argument inside variables object. 
    // Destructure { id, data } explicitly from that object argument.
    mutationFn: ({ id, data }) => {
      return editFood(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      navigate('/admin/food-management')
    },
    onError: (err) => {
      console.error(err);
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const dataToSend = new FormData()
      dataToSend.append('name', formData.name)
      dataToSend.append('price', formData.price)
      dataToSend.append('description', formData.description)
      dataToSend.append('category', formData.category)
      
      if (selectedFile) {
        dataToSend.append('photo', selectedFile) 
      }

      console.log('Submitting menu Form Data to API...')
      
      // FIX 5: Pass parameters wrapped up nicely in a single object wrapper
      if (food._id) {
        editMutation.mutate({ id: food._id, data: dataToSend })
      } else {
        console.error("Missing food ID. Cannot update item.")
      }
                
    } catch (error) {
      console.error("Failed to add menu item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Edit Dish</h2>
          <p className="text-sm text-gray-500 mt-0.5">Fill out the fields and upload an image to update the menu.</p>
        </div>
        {/* FIX 7: Wrapped navigation loop securely inside an anonymous callback handle */}
        <button
          type="button"
          onClick={() => navigate('/admin/food-management')}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
        >
          ⬅ Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">Dish Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Spicy Double Zinger Burger"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm bg-white text-gray-800"
            >
              <option value="Fast Food">Fast Food</option>
              <option value="Italian">Italian</option>
              <option value="Beverages">Beverages</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-800"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe flavors, ingredients, allergens..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-800 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Food Photo Asset</label>
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                <span className="text-3xl mb-2">📸</span>
                <p className="mb-1 text-sm text-gray-700 font-medium">
                  {selectedFile ? selectedFile.name : 'Click to select an image file'}
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, or WEBP up to 5MB</p>
              </div>
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                required={!imagePreview} 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {imagePreview && (
          <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-xl flex items-center gap-4">
            <img 
              src={imagePreview} 
              alt="Uploaded file preview panel" 
              className="h-16 w-16 rounded-lg object-cover bg-gray-100 border border-orange-200 flex-shrink-0"
            />
            <div>
              <p className="text-xs font-semibold text-orange-800">Local Upload Staged Successfully</p>
              <p className="text-xs text-gray-500 mt-0.5">Ready to be processed and dispatched securely straight to your file system storage engine.</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/food-management')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || editMutation.isPending}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-100"
          >
            {editMutation.isPending ? "Saving..." : "Publish Dish"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default EditFood