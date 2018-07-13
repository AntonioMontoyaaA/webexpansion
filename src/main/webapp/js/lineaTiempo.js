var tasks = [
	{
		    id: 'Zemtrumx',
		    name: 'Zemtrumx',
		    start: '2018-07-13',
		    end: '2018-07-30',
		    progress: 100
		   
  },
  {
    id: 'GerenteExpansion',
    name: 'Gerente de Expansion',
    start: '2018-07-13',
    end: '2018-07-18',
    progress: 80
   
  },
  {
	    id: 'Expansion',
	    name: 'Expansion',
	    start: '2018-07-18',
	    end: '2018-07-25',
	    progress: 50,
	    dependencies:'GerenteExpansion'
	},
	{
		    id: 'gestoria',
		    name: 'Gestoría',
		    start: '2018-07-25',
		    end: '2018-07-30',
		    progress: 0,
		    dependencies: 'Expansion'
	},
	{
	    id: 'construccion',
	    name: 'Construccion',
	    start: '2018-07-25',
	    end: '2018-07-30',
	    progress: 0,
	    dependencies: 'Expansion'
},
	{
	    id: 'operaciones',
	    name: 'Operaciones',
	    start: '2018-07-25',
	    end: '2018-07-30',
	    progress: 100,
	    dependencies: 'Expansion'
}
  
]
var gantt = new Gantt("#gantt", tasks);