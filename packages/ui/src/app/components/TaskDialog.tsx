'use client'

import * as z from 'zod'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FC, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Task, useCreateTask, useUpdateTask } from '../hooks/useTasks'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PencilIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  summary: z.string(),
  description: z.string().optional(),
  status: z.enum(['todo', 'doing', 'done']),
  size: z.enum(['xs', 's', 'm', 'l', 'xl']),
})

type FormData = z.infer<typeof formSchema>

interface TaskDialogProps {
  task?: Task
}

const TaskDialog: FC<TaskDialogProps> = ({ task }) => {
  const [open, setOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: task?.summary ?? '',
      description: task?.description ?? '',
      status: task?.status ?? 'todo',
      size: task?.size ?? 'm',
    },
  })

  const { mutate: createTask } = useCreateTask()
  const { mutate: updateTask } = useUpdateTask()
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (task) {
      return updateTask(
        { ...task, ...data },
        {
          onSuccess: () => {
            form.reset()
            setOpen(false)
          },
        },
      )
    }
    createTask(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {task ? (
          <Button className="p-0 m-0 h-4" variant="ghost" size="sm">
            <PencilIcon className="ml-1.5 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{task ? 'Update Task' : 'Add New Task'}</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="s">Small</SelectItem>
                      <SelectItem value="m">Medium</SelectItem>
                      <SelectItem value="l">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="doing">Doing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDialog
