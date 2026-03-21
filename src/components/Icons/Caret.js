import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const Caret = ({ position = 'down' }) =>
  position === 'right' ? <ChevronRight size={14} /> : <ChevronDown size={14} />
