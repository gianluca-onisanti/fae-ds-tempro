'use client';

import {
  Button,
  Container,
  useTheme,
  Grid2,
  Box,
  Typography,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useStyles } from '../styles/Styler';
import { Add, Check, Close, PlayArrow, Timer } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import usuarios from './data/usuarios.json';
import tarefas from './data/tarefas.json';
import subtarefas from './data/subtarefas.json';

// Definindo tipos específicos para tarefa e subtarefa
interface Tarefa {
  id: number;
  titulo: string;
  usuario: number;
  criado_em: string;
  editado_em: string;
  entrega_em: string;
}

interface Subtarefa extends Tarefa {
  tarefa_pai: number;
}

export default function HomePage() {
  const theme = useTheme();
  const sx = useStyles();
  const [data, setData] = useState<{
    usuarios: any[];
    tarefas: Tarefa[];
    subtarefas: Subtarefa[];
  }>({
    usuarios,
    tarefas,
    subtarefas,
  });

  const [newData, setNewData] = useState({ titulo: '', usuario: -1 });

  const [adder, setAdder] = useState({ status: false, type: '', index: -1 });

  const handleClick = (e: any) => {
    const newData = {
      ...data,
      usuarios: data.usuarios.map((usuario, index) => {
        if (index === 0) {
          return { ...usuario, id: 20 };
        }
        return usuario;
      }),
    };
    setData(newData);
  };

  const handleAdding = (e: any) => {
    console.log(e.target);

    const name = e.target.dataset.name as 'tarefa' | 'subtarefa';
    const index = Number(e.target.dataset.index) || -1;

    const type = {
      tarefa: 't',
      subtarefa: 's',
    } as const;

    setAdder({ status: true, type: type[name], index: index });
  };

  function displayArrow(
    item: any,
    variant: any,
    style?: any,
    bold: boolean = false
  ) {
    return (
      <Typography
        fontStyle={style}
        variant={variant}
        fontWeight={bold ? 'bold' : ''}
      >
        {item}
      </Typography>
    );
  }

  function getUser(id: number) {
    return data.usuarios.filter((item: any) => item.id === id)[0].nome;
  }

  function adderStyle() {
    return {
      gap: 1,
      color: theme.palette.background.default,
      backgroundColor: theme.palette.primary.main,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
        color: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}50`,
        border: `2px solid ${theme.palette.primary.main}`,
      },
    };
  }

  function userSelector(id: number, task: number) {
    const handleSelect = (e: any) => {
      const result = {
        ...data,
        subtarefas: data.subtarefas.map((sub, index) => {
          if (index === task - 1) {
            return { ...sub, usuario: Number(e.target.value) };
          }
          return sub;
        }),
      };
      setData(result);
    };

    return (
      <FormControl fullWidth>
        <InputLabel id="usuario_selector">Responsável</InputLabel>
        <Select
          fullWidth
          name="usuario"
          value={id}
          label="Responsável"
          onChange={handleSelect}
        >
          {data.usuarios.map((item: any) => (
            <MenuItem value={item.id}>{item.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  const handleNewData = (e: any) => {
    const { name, value } = e.target;

    setNewData({
      ...newData,
      [name]: name === 'usuario' ? Number(value) : value,
    });
  };

  const handleAbort = (e: any) => {
    setAdder({ status: false, type: '', index: -1 });
    setNewData({ titulo: '', usuario: -1 });
  };

  const handleCheck = (e: any) => {
    let newTask: Tarefa | Subtarefa;
    const today = new Date().toISOString().slice(0, 10);

    if (adder.index > 0) {
      newTask = {
        id: data.subtarefas.length + 1,
        titulo: newData.titulo,
        usuario: newData.usuario,
        criado_em: today,
        editado_em: today,
        entrega_em: today,
        tarefa_pai: Number(adder.index),
      };

      setData({
        ...data,
        subtarefas: [...data.subtarefas, newTask as Subtarefa],
      });
    } else {
      newTask = {
        id: data.tarefas.length + 1,
        titulo: newData.titulo,
        usuario: newData.usuario,
        criado_em: '2025-03-21',
        editado_em: '2025-03-21',
        entrega_em: '2025-03-21',
      };
      setData({
        ...data,
        tarefas: [...data.tarefas, newTask as Tarefa],
      });
    }
    setAdder({ status: false, type: '', index: -1 });
    setNewData({ titulo: '', usuario: -1 });
  };

  return (
    <Container>
      <List>
        {data.tarefas.map((item: any) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={displayArrow(item.titulo, 'h6', '', true)}
                secondary={displayArrow(
                  `Criado em: ${item.criado_em}`,
                  'body2',
                  'italic',
                  false
                )}
              />
            </ListItem>
            <List sx={{ margin: '0px 0px 20px 60px' }}>
              {data.subtarefas
                .filter((sub: any) => sub.tarefa_pai === item.id)
                .map((sub: any) => (
                  <React.Fragment key={sub.id}>
                    <ListItem key={sub.id}>
                      <Grid2
                        container
                        spacing={{ xs: 1, md: 2 }}
                        alignItems={'center'}
                      >
                        <Grid2 width="max-content" size={6}>
                          <Box
                            sx={{
                              width: '480px',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              backgroundColor: `${theme.palette.primary.main}75`,
                            }}
                          >
                            <ListItemText
                              primary={displayArrow(sub.titulo, '', '', true)}
                              secondary={displayArrow(
                                `Criado em: ${sub.criado_em}`,
                                'body2',
                                'italic',
                                false
                              )}
                            />
                          </Box>
                        </Grid2>
                        <Grid2 width="max-content" size={4}>
                          <Box width={'235px'}>
                            {userSelector(sub.usuario, sub.id)}
                          </Box>
                        </Grid2>
                        <Grid2 width="max-content" size={1}>
                          <IconButton sx={sx.timer}>
                            <PlayArrow fontSize="small" />
                          </IconButton>
                        </Grid2>
                      </Grid2>
                    </ListItem>
                  </React.Fragment>
                ))}
              <ListItem>
                {adder.type !== 's' || adder.index !== item.id ? (
                  <Button
                    disabled={adder.status}
                    sx={adderStyle}
                    onClick={handleAdding}
                    data-name="subtarefa"
                    data-index={item.id}
                  >
                    <Add sx={{ color: 'inherit', pointerEvents: 'none' }} />
                    <ListItemText
                      sx={{ pointerEvents: 'none' }}
                      primary={displayArrow(
                        'Adicionar Subtarefa',
                        'caption',
                        '',
                        true
                      )}
                    />
                  </Button>
                ) : (
                  <div style={{ display: 'inline-flex', gap: 20 }}>
                    <TextField
                      sx={{ width: '420px' }}
                      name="titulo"
                      value={newData.titulo}
                      label="Nome da Subtarefa"
                      onChange={handleNewData}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="usuario_selector">Responsável</InputLabel>
                      <Select
                        fullWidth
                        name="usuario"
                        value={newData.usuario}
                        label="Responsável"
                        onChange={handleNewData}
                      >
                        {data.usuarios.map((item: any) => (
                          <MenuItem value={item.id}>{item.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button onClick={handleAbort}>
                      <Close color="error" />
                    </Button>
                    {newData.titulo && newData.usuario && (
                      <Button data-checker="sub" onClick={handleCheck}>
                        <Check />
                      </Button>
                    )}
                  </div>
                )}
              </ListItem>
            </List>
            <Divider sx={{ width: '235px' }} />
            <Divider sx={{ width: '235px' }} />
            <Divider sx={{ width: '235px' }} />
          </React.Fragment>
        ))}
        <ListItem>
          {adder.type !== 't' ? (
            <Button
              disabled={adder.status}
              sx={adderStyle}
              onClick={handleAdding}
              data-name="tarefa"
            >
              <Add sx={{ color: 'inherit', pointerEvents: 'none' }} />
              <ListItemText
                sx={{ pointerEvents: 'none' }}
                primary={displayArrow('Adicionar Tarefa', 'body1', '', true)}
              />
            </Button>
          ) : (
            <div style={{ display: 'inline-flex', gap: 20 }}>
              <TextField
                sx={{ width: '420px' }}
                name="titulo"
                value={newData.titulo}
                label="Nome da Tarefa"
                onChange={handleNewData}
              />
              <FormControl fullWidth>
                <InputLabel id="usuario_selector">Responsável</InputLabel>
                <Select
                  fullWidth
                  name="usuario"
                  value={newData.usuario}
                  label="Responsável"
                  onChange={handleNewData}
                >
                  {data.usuarios.map((item: any) => (
                    <MenuItem value={item.id}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleAbort}>
                <Close color="error" />
              </Button>
              {newData.titulo && newData.usuario && (
                <Button onClick={handleCheck}>
                  <Check />
                </Button>
              )}
            </div>
          )}
        </ListItem>
      </List>
    </Container>
  );
}
