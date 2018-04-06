package com.tiendas.neto.vo;

public class ServiceResponse {
	private boolean success;
	private String mensaje;
	private Object result;
	private Object result2;
	private Object result3;
	

	public Object getResult3() {
		return result3;
	}

	public void setResult3(Object result3) {
		this.result3 = result3;
	}

	public Object getResult2() {
		return result2;
	}

	public void setResult2(Object result2) {
		this.result2 = result2;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}
}
