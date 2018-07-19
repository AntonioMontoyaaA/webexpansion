package com.tiendas.neto.singleton;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class SingletonProperties {

	private static SingletonProperties instancia = null;
	private Properties p;

	private SingletonProperties() {
		p = new Properties();
		String fileName = System.getProperty("jboss.server.config.dir")+"/expansion/config/expansionweb.properties";

		try {
			p.load(new FileInputStream(fileName));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static SingletonProperties getInstancia() {

		if (instancia == null) {
			instancia = new SingletonProperties();
		}
		return instancia;
	}

	public String getPropiedad(String clave) {
		return p.getProperty("prefijo") + p.getProperty(clave);
	}
}