import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useTheme } from '../context/ThemeContext'

function SearchableSelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Search...',
  isCreatable = false,
  isDisabled = false,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const Component = isCreatable ? CreatableSelect : Select

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>

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
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: state.isFocused
              ? '#3b82f6'
              : isDark
              ? '#475569'
              : '#cbd5e1',
            boxShadow: state.isFocused
              ? isDark
                ? '0 0 0 2px rgba(59,130,246,0.25)'
                : '0 0 0 2px rgba(59,130,246,0.1)'
              : 'none',
            '&:hover': {
              borderColor: '#3b82f6',
            },
          }),

          menu: (base) => ({
            ...base,
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            zIndex: 30,
          }),

          menuList: (base) => ({
            ...base,
            paddingTop: 4,
            paddingBottom: 4,
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#2563eb'
              : state.isFocused
              ? isDark
                ? '#1e293b'
                : '#eff6ff'
              : 'transparent',
            color: state.isSelected
              ? '#ffffff'
              : isDark
              ? '#f1f5f9'
              : '#0f172a',
            cursor: 'pointer',
          }),

          singleValue: (base) => ({
            ...base,
            color: isDark ? '#f1f5f9' : '#0f172a',
          }),

          input: (base) => ({
            ...base,
            color: isDark ? '#f1f5f9' : '#0f172a',
          }),

          placeholder: (base) => ({
            ...base,
            color: isDark ? '#94a3b8' : '#64748b',
          }),

          dropdownIndicator: (base) => ({
            ...base,
            color: isDark ? '#94a3b8' : '#64748b',
            '&:hover': {
              color: '#3b82f6',
            },
          }),

          clearIndicator: (base) => ({
            ...base,
            color: isDark ? '#94a3b8' : '#64748b',
            '&:hover': {
              color: '#ef4444',
            },
          }),

          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: isDark ? '#475569' : '#cbd5e1',
          }),
        }}
      />
    </div>
  )
}

export default SearchableSelectField