import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import Action from './action'

type ActionsData = {
    title: string
    description: React.ReactElement
    form: React.ReactNode
    dropdownButtonText: string
}

const ActionsButton = ({
    actionsData,
} : {
    actionsData: ActionsData[]
}) => {
    const [actions, setActions] = useState<React.ReactNode>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [actionsStateManager, setActionsStateManager] = useState<Map<number, boolean>>();

    useEffect(() => {
        const initialState = new Map<number, boolean>();
        actionsData.map((action, index) => {
            initialState.set(index, false)
        })

        setActionsStateManager(initialState)
    }, [actionsData])

    const handleToggleAction = (index: number, isOpen: boolean) => {
        setActionsStateManager((prev) => {
            const newMap = new Map(prev)
            newMap.set(index, isOpen)
            return newMap;
        });
    };

    useEffect(() => {
        const generatedActions = actionsData.map((action, index) => {
            return (
                <Action
                    key={index}
                    title={action.title}
                    description={action.description}
                    form={action.form}
                    isOpen={actionsStateManager ? actionsStateManager.get(index) || false : false}
                    setIsOpen={(isOpen: boolean) => handleToggleAction(index, isOpen)}
                />
            )
        })

        setActions(generatedActions)
        setIsLoading(false)
    }, [actionsStateManager])

    if (isLoading || !actionsData.length) return <div>Loading actions...</div>

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Раскрыть меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsData.map((action, index) => {
                        return (
                            <DropdownMenuItem key={index} onClick={() => handleToggleAction(index, true)}>
                                {action.dropdownButtonText}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            {actions}
        </>
    )
}

export default ActionsButton
