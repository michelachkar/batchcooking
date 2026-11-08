import clsx from 'clsx'
import { Icon, type IconName } from '@/components/ui/icon'
import styles from './field.module.css'

export type FieldOption = { value: string; label: string }

type FieldProps = {
  id: string
  icon: IconName
  label: string
  children: React.ReactNode
}

// Champ de formulaire : étiquette en capitales, icône à gauche et contrôle (input ou select).
export function Field({ id, icon, label, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <span className={styles.control}>
        <Icon name={icon} className={styles.fieldIcon} />
        {children}
      </span>
    </div>
  )
}

type TextFieldProps = Omit<React.ComponentProps<'input'>, 'id' | 'className'> &
  Pick<FieldProps, 'id' | 'icon' | 'label'>

export function TextField({ id, icon, label, ...input }: TextFieldProps) {
  return (
    <Field id={id} icon={icon} label={label}>
      <input id={id} className={styles.input} {...input} />
    </Field>
  )
}

type SelectFieldProps = Omit<React.ComponentProps<'select'>, 'id' | 'className' | 'children'> &
  Pick<FieldProps, 'id' | 'icon' | 'label'> & {
    placeholder: string
    options: FieldOption[]
  }

export function SelectField({
  id,
  icon,
  label,
  placeholder,
  options,
  ...select
}: SelectFieldProps) {
  return (
    <Field id={id} icon={icon} label={label}>
      <select id={id} defaultValue="" className={clsx(styles.input, styles.select)} {...select}>
        <option value="" disabled={select.required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
