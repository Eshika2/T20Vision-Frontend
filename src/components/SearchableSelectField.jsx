import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

function SearchableSelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Search...',
  isCreatable = false,
  isDisabled = false,
}) {
  const Component = isCreatable ? CreatableSelect : Select

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <Component
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable
        className="text-sm"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: '48px',
            borderRadius: '0.75rem',
            borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(59,130,246,0.1)' : 'none',
            '&:hover': {
              borderColor: '#3b82f6',
            },
          }),
        }}
      />
    </div>
  )
}

export default SearchableSelectField