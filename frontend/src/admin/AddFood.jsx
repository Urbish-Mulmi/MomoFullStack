import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { addFood } from '../api/food.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AddFood = () => {
  const navigate = useNavigate()
  
  // Local state management for the form inputs
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Fast Food'
  })
  
  const queryClient = useQueryClient()

  // Track the actual file object and its object URL preview
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Text input state change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Creates a temporary local URL string for instant image previewing
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const addMutation = useMutation(
    {
      mutationFn:(data)=>{
        return addFood(data);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["foods"]});
        navigate('/admin/food-management');        
      },
      onError:(err)=>{
        console.log(err);
      },
    }
  )

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use FormData when sending files/photo to a backend API
      const dataToSend = new FormData()
      dataToSend.append('name', formData.name)
      dataToSend.append('price', formData.price)
      dataToSend.append('description', formData.description)
      dataToSend.append('category', formData.category)
      
      if (selectedFile) {
        dataToSend.append('photo', selectedFile) // 'photo' matches backend field name
      }


      console.log('Submitting menu ko FormData to API...')
      addMutation.mutate(dataToSend)
      
   
      // Example of your TanStack mutation or Axios API request:
      // await addFoodItem(dataToSend) 
                
    } catch (error) {
      console.error("Failed to add menu item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add New Dish</h2>
          <p className="text-sm text-gray-500 mt-0.5">Fill out the fields and upload an image to update the menu.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/food-management')}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
        >
          ⬅ Back to List
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        
        {/* Name Input */}
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

        {/* Category & Price Row */}
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
            <label htmlFor="price" className="text-sm font-semibold text-gray-700">Price (NRP)</label>
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

        {/* Description */}
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

        {/* Advanced File Upload Dropzone Wrapper */}
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
                required={!imagePreview} // Required only if no current preview image exists
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Local Preview Framework rendering wrapper */}
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

        {/* Form Action Triggers */}
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
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-100"
          >
            {addMutation.isPending?"Saving":"Save item"}
            {isSubmitting ? 'Uploading Data...' : 'Publish Dish'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddFood